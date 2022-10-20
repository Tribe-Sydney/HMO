const Patient = require("../models/patient-model");
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
