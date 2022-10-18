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

const doctorSchema = new mongoose.Schema(
  { ...User, ...doctor },
  { toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.passwordConfirm = undefined;
  next();
});

doctorSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordTokenExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

doctorSchema.methods.changePasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    console.log(JWTTimestamp < this.passwordChangedAt);
    return JWTTimestamp < this.passwordChangedAt;
  }
  return false;
};

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
