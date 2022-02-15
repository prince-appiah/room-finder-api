const express = require("express");

module.exports = (app) => {
  let router = express.Router();

  let authRoutes = require("./auth.routes")(app);
  router.use(authRoutes);

  let roomRoutes = require("./rooms.routes")(app);
  router.use(roomRoutes);

  let roomTypeRoutes = require("./room-type.routes")(app);
  router.use(roomTypeRoutes);

  let amenityRoutes = require("./amenity.routes")(app);
  router.use(amenityRoutes);

  return router;
};
