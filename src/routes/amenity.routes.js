const express = require("express");
const AmenityController = require("../controllers/amenity.controller");

module.exports = (app) => {
  let router = express.Router();

  router.get("/amenities", AmenityController.listAll);
  router.post("/amenities", AmenityController.create);
  router.patch("/amenities/:id", AmenityController.update);
  router.delete("/amenities/:id", AmenityController.remove);

  return router;
};
