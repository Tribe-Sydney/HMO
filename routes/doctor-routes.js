const express = require("express");
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
} = require("../controllers/doctor-auth-controllers");

const router = express.Router();

router.post("/signup", doctorSignUp);

router.post("/signin", doctorSignIn);

router.get("/", getAllDoctors);

router.route("/:id").get(getDoctor).patch(updateDoctor).delete(deleteDoctor);

router.post("/forgot-password", doctorForgotPassword);

router.patch("/reset-password/:token", resetDoctorPassword);

router.patch("/update-password/:id", protectDoctor, updateDoctorPassword);

module.exports = router;
