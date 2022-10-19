const Doctor = require("../models/doctor-model");
const {
  signUp,
  getAll,
  getOne,
  deleteOne,
  updateOne,
  signIn,
  protect,
  restrictTo,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require("./generic-controllers");

exports.doctorSignUp = signUp(Doctor);

exports.getAllDoctors = getAll(Doctor);

exports.getDoctor = getOne(Doctor);

exports.deleteDoctor = deleteOne(Doctor);

exports.updateDoctor = updateOne(Doctor);

exports.doctorSignIn = signIn(Doctor);

exports.protectDoctor = protect(Doctor);

exports.restrictDoctor = restrictTo(Doctor);

exports.doctorForgotPassword = forgotPassword(Doctor);

exports.resetDoctorPassword = resetPassword(Doctor);

exports.updateDoctorPassword = updatePassword(Doctor);
