const express = require("express");
const UsersController = require("../controllers/users.controller");

module.exports = (app) => {
  let router = express.Router();

  router.get("/users", UsersController.getAllUsers);

  return router;
};
