const express = require("express");
const { roles } = require("../config/constants");
const BookingController = require("../controllers/bookings.controller");
const HostsController = require("../controllers/hosts.controller");
const allowRoles = require("../middlewares/allowRoles");
const requireToken = require("../middlewares/requireToken");

module.exports = (app) => {
  let router = express.Router();

  router.get("/bookings", requireToken, allowRoles([roles.ADMIN]), BookingController.getAllBookings);

  router.get(
    "/customer-bookings",
    requireToken,
    allowRoles([roles.USER, roles.ADMIN]),
    BookingController.getCustomerBookings,
  );

  router.get("/host-bookings", requireToken, allowRoles([roles.HOST]), BookingController.getHostBookings);

  router.get(
    "/host-bookings/:booking_id",
    requireToken,
    allowRoles([roles.HOST]),
    BookingController.getHostBookingDetails,
  );

  router.get(
    "/interested-parties/:property_id",
    requireToken,
    allowRoles([roles.HOST]),
    BookingController.getInterestedParties,
  );

  // check if a property is already booked
  router.get(
    "/customer-bookings/:property_id",
    requireToken,
    allowRoles([roles.USER]),
    BookingController.checkBookedProperty,
  );

  router.patch("/booking-property/cancel", requireToken, allowRoles([roles.USER]), BookingController.cancelBooking);

  router.post("/booking-property", requireToken, allowRoles([roles.USER]), BookingController.addBooking);

  router.get("/bookings/:id", HostsController.getHost);

  router.patch("/bookings/:id", HostsController.updateHost);

  router.delete("/bookings/:id", HostsController.deleteHost);

  return router;
};
