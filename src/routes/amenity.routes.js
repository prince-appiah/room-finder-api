const express = require("express");
const { all } = require("express/lib/application");
const { roles } = require("../config/constants");
const AmenityController = require("../controllers/amenity.controller");
const allowRoles = require("../middlewares/allowRoles");
const requireToken = require("../middlewares/requireToken");

module.exports = (app) => {
  let router = express.Router();

  router.get("/amenities", AmenityController.listAll);

  router.get("/amenities/:id", AmenityController.getAmenity);

  router.post(
    "/amenities",
    requireToken,
    allowRoles([roles.ADMIN]),
    AmenityController.create
  );

  router.patch(
    "/amenities/:id",
    requireToken,
    allowRoles([roles.ADMIN]),
    AmenityController.update
  );

  router.delete(
    "/amenities/:id",
    requireToken,
    allowRoles([roles.ADMIN]),
    AmenityController.remove
  );

  return router;
};
