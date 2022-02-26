const express = require("express");
const AuthController = require("../controllers/auth.controller");
const OtpRepo = require("../repositories/otp.repo");

module.exports = (app) => {
  let router = express.Router();

  router.post("/login", AuthController.login);
  router.post("/signup", AuthController.signup);
  router.post("/otp", AuthController.getOtp);
  router.post("/logout", AuthController.logout);

  return router;
};
