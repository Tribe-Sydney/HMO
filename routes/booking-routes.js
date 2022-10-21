const express = require("express");
const {
  getAllBooking,
  createBooking,
  getBooking,
} = require("../controllers/booking-controllers");
const { protectPatient } = require("../controllers/patient-controllers");

const router = express.Router();

router.route("/").get(getAllBooking).post(protectPatient, createBooking);
router.route("/:id").get(getBooking);

module.exports = router;
