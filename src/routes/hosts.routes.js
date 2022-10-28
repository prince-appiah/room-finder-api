const express = require("express");
const { roles } = require("../config/constants");
const requireToken = require("../middlewares/requireToken");
const allowRoles = require("../middlewares/allowRoles");
const HostsController = require("../controllers/hosts.controller");

module.exports = (app) => {
  let router = express.Router();

  router.get(
    "/host-dashboard-reports",
    requireToken,
    allowRoles([roles.HOST]),
    HostsController.getDashboardReports
  );

  router.get(
    "/hosts",
    requireToken,
    allowRoles([roles.ADMIN]),
    HostsController.getAllHosts
  );

  router.patch(
    "/hosts-profile",
    requireToken,
    allowRoles([roles.HOST]),
    HostsController.updateHostProfile
  );

  router.post("/hosts", HostsController.createHost);

  router.get("/hosts/:id", HostsController.getHost);

  router.patch("/hosts/:id", HostsController.updateHost);

  router.delete("/hosts/:id", HostsController.deleteHost);

  return router;
};
