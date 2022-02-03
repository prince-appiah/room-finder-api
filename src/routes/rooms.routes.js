const express = require("express");
const RoomController = require("../controllers/room.controller");

module.exports = (app) => {
  let router = express.Router();

  router.post("/rooms", RoomController.addRoom);
  router.get("/rooms/:roomId", RoomController.findRoom);
  router.patch("/rooms/:roomId", RoomController.updateRoom);
  router.delete("/rooms/:roomId", RoomController.deleteRoom);

  return router;
};
