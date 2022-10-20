const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  doctorId: {
    type: String,
    required: true,
  },
  patientId: {
    type: String,
    required: true,
  },
  meetingTime: {
    type: String,
    required: true,
  },
  createdAt: Date.now(),
  meetingCompleted: Boolean,
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
