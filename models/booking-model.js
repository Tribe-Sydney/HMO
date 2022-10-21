const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.ObjectId,
    ref: "Doctor",
    required: [true, "A doctor Id is required"],
  },
  patientId: {
    type: mongoose.Schema.ObjectId,
    ref: "Patient",
    required: [true, "A patient Id is required"],
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
