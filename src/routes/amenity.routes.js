const express = require("express");
const { roles } = require("../config/constants");
const AmenityController = require("../controllers/amenity.controller");
const allowRoles = require("../middlewares/allowRoles");
const requireToken = require("../middlewares/requireToken");

module.exports = (app) => {
  let router = express.Router();

  router.get(
    "/amenities",
    requireToken,
    allowRoles([roles.USER]),
    AmenityController.listAll
  );

  router.post("/amenities", AmenityController.create);
  router.patch("/amenities/:id", AmenityController.update);
  router.delete("/amenities/:id", AmenityController.remove);

  return router;
};
