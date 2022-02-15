const express = require("express");
const RoomTypeController = require("../controllers/room-type.controller");

module.exports = (app) => {
  let router = express.Router();

  router.get("/room-types", RoomTypeController.listAll);
  router.post("/room-types", RoomTypeController.create);
  router.patch("/room-types/:id", RoomTypeController.update);
  router.delete("/room-types/:id", RoomTypeController.remove);

  return router;
};
