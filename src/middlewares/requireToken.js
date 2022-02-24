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

      req.user = decoded;

      //   verify token here
      // set user to a req.user
      return next();
    }

    return res.status(401).json({ msg: "Unauthorized" });
  } catch (error) {
    return res.status(500).json(JSON.parse(error));
  }
};

module.exports = requireToken;
