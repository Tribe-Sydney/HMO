const catchAsync = require("../utils/catchAsync");
const ErrorObject = require("../utils/error");
const QueryMethod = require("../utils/query");

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
  catchAsync(async (req, res) => {
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
