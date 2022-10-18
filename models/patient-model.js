const { default: mongoose } = require("mongoose");
const User = require("../utils/user");

const patient = {
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