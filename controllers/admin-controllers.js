const Admin = require("../models/admin-model");
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

exports.adminSignUp = signUp(Admin);

exports.adminSignIn = signIn(Admin);

exports.getAllAdmin = getAll(Admin);

exports.getAdmin = getOne(Admin);

exports.updateAdmin = updateOne(Admin);

exports.deleteAdmin = deleteOne(Admin);

exports.protectAdmin = protect(Admin);

exports.restrictAdmin = restrictTo(Admin);

exports.adminForgotPassword = forgotPassword(Admin);

exports.resetAdminPassword = resetPassword(Admin);

exports.updateAdminPassword = updatePassword(Admin);
