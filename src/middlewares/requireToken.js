const Sentry = require("@sentry/node");
const TokenConfig = require("../config/token");

const requireToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (authHeader && authHeader.startsWith("Bearer")) {
      const token = authHeader.split(" ")[1];

      if (!token) {
        return res.status(403).json({ msg: "Token is required" });
      }

      const decoded = await TokenConfig.verifyToken(token);

      if (decoded && decoded?.exp) {
        req.user = decoded;
        return next();
      }

      return res.status(401).json({ msg: "Token expired" });
    }

    return res.status(401).json({ msg: "Unauthorized" });
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).json(error);
  }
};

module.exports = requireToken;
