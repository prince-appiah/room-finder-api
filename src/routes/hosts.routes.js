const express = require("express");
const HostsController = require("../controllers/hosts.controller");

module.exports = (app) => {
  let router = express.Router();

  router.get("/hosts", HostsController.getAllHosts);

  router.post("/hosts", HostsController.createHost);

  router.get("/hosts/:id", HostsController.getHost);

  router.patch("/hosts/:id", HostsController.updateHost);

  router.delete("/hosts/:id", HostsController.deleteHost);

  return router;
};
