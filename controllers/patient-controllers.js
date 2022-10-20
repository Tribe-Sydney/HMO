const Patient = require("../models/patient-model");
const catchAsync = require("../utils/catch-async");
const ErrorObject = require("../utils/error");
const chargeCard = require("../utils/payment");
const {
  signUp,
  signIn,
  getAll,
  getOne,
  updateOne,
  deleteOne,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
} = require("./generic-controllers");

exports.patientSignUp = signUp(Patient);

exports.patientSignIn = signIn(Patient);

exports.getAllPatient = getAll(Patient);

exports.getPatient = getOne(Patient);

exports.updatePatient = updateOne(Patient);

exports.deletePatient = deleteOne(Patient);

exports.patientForgotPassword = forgotPassword(Patient);

exports.resetPatientPassword = resetPassword(Patient);

exports.updatePatientPassword = updatePassword(Patient);

exports.protectPatient = protect(Patient);

exports.planSubscribtion = catchAsync(async (req, res, next) => {
  if (!req.user.profileCompleted) {
    return next(
      new ErrorObject(
        "You've not completed your profile, please do before subscribing",
        400
      )
    );
  }
  let request = req.body;
  let users = req.user;
  const payment = await chargeCard(request, users);

  if (payment.status !== "success") {
    return next(new ErrorObject("Error processing payment", 400));
  }
  const user = await Patient.findById(req.user.id);
  user.plan = req.body.plan;
  await user.save();
  res.status(200).json({
    status: "success",
    payment,
  });
});
