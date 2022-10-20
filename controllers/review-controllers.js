const Review = require("../models/review-model");
const catchAsync = require("../utils/catch-async");
const { getAll, getOne } = require("./generic-controllers");

exports.getAllReview = getAll(Review);

exports.getReview = getOne(Review);

exports.createReview = catchAsync(async (req, res, next) => {
  const { message, patientId, doctorId, ratings, bookingId } = req.body;

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
