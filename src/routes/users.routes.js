const express = require("express");
const UsersController = require("../controllers/users.controller");

module.exports = (app) => {
  let router = express.Router();

  router.get("/hosts", UsersController.getAllHosts);

  router.post("/hosts", UsersController.createHost);

  router.get("/hosts/:id", UsersController.getHost);

  router.patch("/hosts/:id", UsersController.updateHost);

  router.delete("/hosts/:id", UsersController.deleteHost);

  return router;
};
