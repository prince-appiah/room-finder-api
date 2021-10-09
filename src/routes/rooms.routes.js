const express = require("express");
const RoomController = require("../controllers/room.controller");

module.exports = (app) => {
  let router = express.Router();

  router.post("/rooms", RoomController.addRoom);
  router.get("/");

  return router;
};
