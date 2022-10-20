const express = require("express");
const { protectAdmin } = require("../controllers/admin-controllers");
const {
  doctorSignUp,
  doctorSignIn,
  getAllDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
  doctorForgotPassword,
  resetDoctorPassword,
  updateDoctorPassword,
  protectDoctor,
  verifyDoctor,
} = require("../controllers/doctor-controllers");

const router = express.Router();

router.post("/signup", doctorSignUp);

router.post("/signin", doctorSignIn);

router.get("/", getAllDoctors);

router.route("/:id").get(getDoctor).patch(updateDoctor).delete(deleteDoctor);

router.post("/forgot-password", doctorForgotPassword);

router.patch("/reset-password/:token", resetDoctorPassword);

router.patch("/update-password/:id", protectDoctor, updateDoctorPassword);

router.patch("/verify-doctor/:id", protectAdmin, verifyDoctor);

module.exports = router;
