const express = require("express");
const { roles } = require("../config/constants");
const BookingController = require("../controllers/bookings.controller");
const HostsController = require("../controllers/hosts.controller");
const allowRoles = require("../middlewares/allowRoles");
const requireToken = require("../middlewares/requireToken");

module.exports = (app) => {
  let router = express.Router();

  router.get(
    "/bookings",
    requireToken,
    allowRoles([roles.ADMIN]),
    BookingController.getAllBookings
  );

  router.get(
    "/customer-bookings",
    requireToken,
    allowRoles([roles.USER]),
    BookingController.getCustomerBookings
  );

  router.post(
    "/bookings",
    requireToken,
    allowRoles([roles.USER]),
    BookingController.addBooking
  );

  router.get("/bookings/:id", HostsController.getHost);

  router.patch("/bookings/:id", HostsController.updateHost);

  router.delete("/bookings/:id", HostsController.deleteHost);

  return router;
};
