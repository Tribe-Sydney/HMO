const Doctor = require("../models/doctor-model");
const catchAsync = require("../utils/catch-async");
const ErrorObject = require("../utils/error");
const {
  signUp,
  getAll,
  getOne,
  deleteOne,
  updateOne,
  signIn,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
} = require("./generic-controllers");

exports.doctorSignUp = signUp(Doctor);

exports.getAllDoctors = getAll(Doctor);

exports.getDoctor = getOne(Doctor);

exports.deleteDoctor = deleteOne(Doctor);

exports.updateDoctor = updateOne(Doctor);

exports.doctorSignIn = signIn(Doctor);

exports.doctorForgotPassword = forgotPassword(Doctor);

exports.resetDoctorPassword = resetPassword(Doctor);

exports.updateDoctorPassword = updatePassword(Doctor);

exports.protectDoctor = protect(Doctor);

exports.completedProfile = catchAsync(async (req, res, next) => {
  // Upload required information and document
  // Send Mail to the admin with a url that gets the particular doctor
});

exports.verifyDoctor = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) {
    return next(new ErrorObject("Doctor with the requested ID not found", 400));
  }

  doctor.verified = true;

  await doctor.save();
  res.status(200).json({
    status: "success",
    doctor,
  });
});
