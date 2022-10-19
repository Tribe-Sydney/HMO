const Patient = require("../models/patient-model");
const {
  signUp,
  signIn,
  getAll,
  getOne,
  updateOne,
  deleteOne,
  protect,
  restrictTo,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require("./generic-controllers");

exports.patientSignUp = signUp(Patient);

exports.patientSignIn = signIn(Patient);

exports.getAllPatient = getAll(Patient);

exports.getPatient = getOne(Patient);

exports.updatePatient = updateOne(Patient);

exports.deletePatient = deleteOne(Patient);

exports.protectPatient = protect(Patient);

exports.restrictPatient = restrictTo(Patient);

exports.patientForgotPassword = forgotPassword(Patient);

exports.resetPatientPassword = resetPassword(Patient);

exports.updatePatientPassword = updatePassword(Patient);
