const express = require("express");
const PropertyController = require("../controllers/property.controller");
const requireToken = require("../middlewares/requireToken");
const allowRoles = require("../middlewares/allowRoles");
const { roles } = require("../config/constants");
const upload = require("../config/multer.config");

module.exports = (app) => {
  let router = express.Router();

  router.post(
    "/property",
    requireToken,
    allowRoles([roles.ADMIN]),
    upload.array("images"),
    PropertyController.addProperty
  );

  router.get("/property", PropertyController.getAll);

  router.get("/property/:id", PropertyController.findProperty);

  router.patch(
    "/approve",
    requireToken,
    allowRoles([roles.ADMIN]),
    PropertyController.approveListing
  );

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
