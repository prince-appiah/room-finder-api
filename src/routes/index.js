const express = require("express");

module.exports = (app) => {
  let router = express.Router();

  let authRoutes = require("./auth.routes")(app);
  router.use(authRoutes);

  let roomRoutes = require("./rooms.routes")(app);
  router.use(roomRoutes);

  return router;
};
