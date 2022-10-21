const Booking = require("../models/booking-model");
const Review = require("../models/review-model");
const catchAsync = require("../utils/catch-async");
const ErrorObject = require("../utils/error");
const { getAll, getOne } = require("./generic-controllers");

exports.getAllReview = getAll(Review);

exports.getReview = getOne(Review);

exports.createReview = catchAsync(async (req, res, next) => {
  const { message, doctorId, ratings, bookingId } = req.body;
  const patientId = req.user.id;
  const booking = await Booking.findById(bookingId);
  if (!booking.meetingCompleted) {
    return next(new ErrorObject("Booking can't be reviewed now", 400));
  }
  const review = await Review.create({
    bookingId,
    message,
    patientId,
    doctorId,
    ratings,
  });

  res.status(201).json({
    status: "success",
    review,
  });
});
