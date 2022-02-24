const express = require("express");
const { roles } = require("../config/constants");
const RoomTypeController = require("../controllers/room-type.controller");
const allowRoles = require("../middlewares/allowRoles");
const requireToken = require("../middlewares/requireToken");

module.exports = (app) => {
  let router = express.Router();

  router.get("/room-types", RoomTypeController.listAll);

  router.get("/room-types/:id", RoomTypeController.getRoomType);

  router.post(
    "/room-types",
    requireToken,
    allowRoles([roles.ADMIN]),
    RoomTypeController.create
  );

  router.patch(
    "/room-types/:id",
    requireToken,
    allowRoles([roles.ADMIN]),
    RoomTypeController.update
  );

  router.delete(
    "/room-types/:id",
    requireToken,
    allowRoles([roles.ADMIN]),
    RoomTypeController.remove
  );

  return router;
};
