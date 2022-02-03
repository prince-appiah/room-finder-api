const express = require("express");
const AuthController = require("../controllers/auth.controller");

module.exports = (app) => {
  let router = express.Router();

  router.post("/login", AuthController.login);
  router.post("/signup", AuthController.signup);

  return router;
};
