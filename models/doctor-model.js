const { default: mongoose } = require("mongoose");
const User = require("../utils/user");

const doctor = {
  role: {
    type: String,
    enum: ["approved", "not-approved"],
    default: "not-approved",
  },
  available: {
    type: Boolean,
  },
  setAvailableTime: {
    type: String,
  },
  ratings: {
    type: Number,
    default: null,
  },
  certification: {
    type: String,
  },
};

const doctorSchema = new mongoose.Schema({ ...User, ...doctor });

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
