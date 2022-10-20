const express = require("express");
const {
  patientSignUp,
  patientSignIn,
  getAllPatient,
  getPatient,
  updatePatient,
  deletePatient,
  patientForgotPassword,
  resetPatientPassword,
  updatePatientPassword,
  protectPatient,
  planSubscribtion,
} = require("../controllers/patient-controllers");

const router = express.Router();

router.post("/signup", patientSignUp);

router.post("/signin", patientSignIn);

router.get("/", getAllPatient);

router.route("/:id").get(getPatient).patch(updatePatient).delete(deletePatient);

router.post("/forgot-password", patientForgotPassword);

router.patch("/reset-password/:token", resetPatientPassword);

router.patch("/update-password/:id", protectPatient, updatePatientPassword);

router.post("/subscribe", protectPatient, planSubscribtion);

module.exports = router;
