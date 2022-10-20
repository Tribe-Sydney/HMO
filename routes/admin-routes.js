const express = require("express");
const {
  adminSignUp,
  adminSignIn,
  getAllAdmin,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  adminForgotPassword,
  resetAdminPassword,
  updateAdminPassword,
  protectAdmin,
} = require("../controllers/admin-controllers");

const router = express.Router();

router.post("/signup", adminSignUp);

router.post("/signin", adminSignIn);

router.get("/", getAllAdmin);

router.route("/:id").get(getAdmin).patch(updateAdmin).delete(deleteAdmin);

router.post("/forgot-password", adminForgotPassword);

router.patch("/reset-password/:token", resetAdminPassword);

router.patch("/update-password/:id", protectAdmin, updateAdminPassword);

module.exports = router;
