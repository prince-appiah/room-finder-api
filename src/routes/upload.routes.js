const express = require("express");
const UsersController = require("../controllers/users.controller");

module.exports = (app) => {
  let router = express.Router();

  router.post("/upload", UsersController.createUser);

  return router;
};
