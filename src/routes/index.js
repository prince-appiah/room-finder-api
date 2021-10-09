const express = require("express");

const roomRoutes = require("./rooms.routes");

module.exports = (app) => {
  let router = express.Router();

  router.use(roomRoutes(app));

  return router;
};
