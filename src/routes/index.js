const express = require("express");

module.exports = (app) => {
  let router = express.Router();

  let roomRoutes = require("./rooms.routes")(app);
  router.use(roomRoutes);

  return router;
};
