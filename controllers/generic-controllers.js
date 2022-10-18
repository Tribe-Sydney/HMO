const catchAsync = require("../utils/catchAsync");
const ErrorObject = require("../utils/error");
const QueryMethod = require("../utils/query");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/User");
const CatchAsync = require("../utils/catch-async");
const ErrorObject = require("../utils/error");
const sendEmail = require("../utils/email");

const { JWT_COOKIE_EXPIRES_IN, JWT_EXPIRES_IN, JWT_SECRET, NODE_ENV } =
  process.env;

const signToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

const createAndSendToken = CatchAsync(async (user, statusCode, res) => {
  const token = await signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  if (NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

exports.signUp = (Model) =>
  CatchAsync(async (req, res, next) => {
    const { email, fullName, password, passwordConfirm, address, phoneNumber } =
      req.body;
    const user = await Model.create({
      email,
      fullName,
      password,
      passwordConfirm,
      address,
      phoneNumber,
    });

    createAndSendToken(user, 201, res);
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id, {
      strict: true,
    });
    if (!doc)
      return next(
        new ErrorObject(`Document with the id ${req.params.id} not found`, 404)
      );
    res.status(204).json({
      status: "deleted",
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const updatedData = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedData)
      return next(
        new ErrorObject(`Document with the id ${req.params.id} not found`, 404)
      );
    res.status(200).json({
      status: "success",
      data: {
        data: updatedData,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    if (!doc)
      return next(
        new ErrorObject(`Document with the id ${req.params.id} not found`, 404)
      );

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res) => {
    let filter = req.params.tourId ? { tourRef: req.params.tourId } : {};
    const features = new QueryMethod(Model.find(filter), req.query)
      .sort()
      .limit()
      .paginate()
      .filter();

    const docs = await features.query;
    res.status(200).json({
      status: "success",
      results: docs.length,
      data: {
        data: docs,
      },
    });
  });
