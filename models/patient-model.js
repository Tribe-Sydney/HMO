const { default: mongoose } = require("mongoose");
const User = require("../utils/user");

const patient = {
    location: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    occupation: {
      type: String,
      required:true
    },
    description: {
      type: String,
    },
  };

  const patientSchema = new mongoose.Schema(
    {...User, ...patient},
    { toObject: { virtuals: true }, toJSON: { virtuals: true } }
  )

  patientSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next()

    let salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    this.passwordConfirm = undefined
    next()
  })

  patientSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
  
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.passwordTokenExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
  };
  
  patientSchema.methods.changePasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
      console.log(JWTTimestamp < this.passwordChangedAt);
      return JWTTimestamp < this.passwordChangedAt;
    }
    return false;
  };
  
  const Patient = mongoose.model("Patient", patientSchema);
  
  module.exports = Patient;
  