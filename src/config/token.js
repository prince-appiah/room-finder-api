const Sentry = require("@sentry/node");
const jwt = require("jsonwebtoken");

class TokenConfig {
  static async verifyToken(token) {
    try {
      if (!token) {
        throw new Error("No token provided");
      }

      const verifiedToken = await jwt.verify(token, process.env.JWT_SECRET, {
        maxAge: "12h", // or 3600 * 5 = 12 hours
      });

      return verifiedToken;
    } catch (error) {
      Sentry.captureException(error);
      console.log("🚀 ~ error", error);
      // TODO check expired token error and return a user-friendly error
      return error;
    }
  }

  static async createToken(payload) {
    try {
      if (!payload) {
        throw new Error("No payload provided");
      }

      const signedToken = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "12h", // or 3600 * 5 = 12 hours
      });

      return signedToken;
    } catch (error) {
      Sentry.captureException(error);
      console.log("🚀 ~ error", error);
      return error;
    }
  }
}

module.exports = TokenConfig;
