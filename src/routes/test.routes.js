const express = require("express");

module.exports = (app) => {
  const router = express.Router();

  router.get("/test");

  return router;
};
