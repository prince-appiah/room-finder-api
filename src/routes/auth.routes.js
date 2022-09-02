const express = require("express");
const { roles } = require("../config/constants");
const AuthController = require("../controllers/auth.controller");
const allowRoles = require("../middlewares/allowRoles");
const requireToken = require("../middlewares/requireToken");
const OtpRepo = require("../repositories/otp.repo");

module.exports = (app) => {
  let router = express.Router();

  router.post("/login", AuthController.login);
  router.post("/signup", AuthController.signup);
  router.post("/otp", AuthController.getOtp);
  router.get(
    "/logout",
    requireToken,
    allowRoles([roles.ADMIN, roles.HOST, roles.USER]),
    AuthController.logout
  );

  return router;
};
