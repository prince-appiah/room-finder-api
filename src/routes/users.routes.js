const express = require("express");
const UsersController = require("../controllers/users.controller");

module.exports = (app) => {
  let router = express.Router();

  router.get("/dashboard-reports", UsersController.getAdminDashboardReport);

  router.get("/users", UsersController.getAllUsers);

  router.post("/users", UsersController.createUser);

  router.patch("/users/:user_id", UsersController.editUser);

  router.delete("/users/:user_id", UsersController.deleteUser);

  return router;
};
