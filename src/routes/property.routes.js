const express = require("express");
const PropertyController = require("../controllers/property.controller");
const requireToken = require("../middlewares/requireToken");
const allowRoles = require("../middlewares/allowRoles");
const { roles } = require("../config/constants");

module.exports = (app) => {
  let router = express.Router();

  router.post(
    "/property",
    requireToken,
    allowRoles([roles.ADMIN]),
    PropertyController.addRoom
  );

  router.get("/property", PropertyController.getAll);

  router.get("/property/:id", PropertyController.findProperty);

  router.patch(
    "/property/:id",
    requireToken,
    allowRoles([roles.ADMIN]),
    PropertyController.updateProperty
  );

  router.delete(
    "/property/:id",
    requireToken,
    allowRoles([roles.ADMIN]),
    PropertyController.deleteProperty
  );

  return router;
};
