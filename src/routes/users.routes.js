const express = require("express");

const { roles } = require("../config/constants");
const UsersController = require("../controllers/users.controller");
const allowRoles = require("../middlewares/allowRoles");
const requireToken = require("../middlewares/requireToken");

module.exports = (app) => {
  let router = express.Router();

  router.get("/dashboard-reports", requireToken, allowRoles([roles.ADMIN]), UsersController.getAdminDashboardReport);

  router.get("/users", UsersController.getAllUsers);

  router.post("/users", requireToken, allowRoles([roles.ADMIN]), UsersController.createUser);

  router.get(
    "/users-info",
    requireToken,
    allowRoles([roles.ADMIN, roles.HOST, roles.USER]),
    UsersController.getUserInfo,
  );

  router.patch("/users/:user_id", UsersController.editUser);

  router.delete("/users/:user_id", requireToken, allowRoles([roles.ADMIN]), UsersController.deleteUser);

  return router;
};
