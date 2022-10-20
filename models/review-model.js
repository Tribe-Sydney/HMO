const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.ObjectId,
    ref: "Booking",
    required: [true, "A booking Id is required"],
  },
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
  message: {
    type: String,
    required: [true, "A message is required"],
  },
  ratings: Number,
  createdAt: Date.now(),
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
