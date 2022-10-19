const express = require("express");
const { route } = require("..");
const { updatePassword } = require("../controllers/auth-controller");
const {
  doctorSignUp,
  doctorSignIn,
  getAllDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
  doctorForgotPassword,
  resetDoctorPassword,
} = require("../controllers/doctor-auth-controllers");

const router = express.Router();

router.post("/signup", doctorSignUp);

router.post("/signin", doctorSignIn);

router.get("/", getAllDoctors);

router.route("/:id").get(getDoctor).patch(updateDoctor).delete(deleteDoctor);

router.post("/forgot-password", doctorForgotPassword);

router.patch("reset-password", resetDoctorPassword);

router.patch("/update-password", updatePassword);

module.exports = router;
