const express = require("express");

module.exports = (app) => {
  let router = express.Router();

  let authRoutes = require("./auth.routes")(app);
  router.use(authRoutes);

  let hostRoutes = require("./hosts.routes")(app);
  router.use(hostRoutes);

  let uploadRoutes = require("./upload.routes")(app);
  router.use(uploadRoutes);

  let userRoutes = require("./users.routes")(app);
  router.use(userRoutes);

  let propertyRoutes = require("./property.routes")(app);
  router.use(propertyRoutes);

  let bookingRoutes = require("./bookings.routes")(app);
  router.use(bookingRoutes);

  let roomTypeRoutes = require("./room-type.routes")(app);
  router.use(roomTypeRoutes);

  let amenityRoutes = require("./amenity.routes")(app);
  router.use(amenityRoutes);

  return router;
};
