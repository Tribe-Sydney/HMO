const validator = require("validator");

const User = {
  firstName: {
    type: String,
    required: [true, "The first-name field is required"],
    maxLength: [20, "A first-name must not be more than 20 characters"],
    minLength: [3, "A first-name must be at least 3 characters"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "The last-name field is required"],
    maxLength: [20, "A last-name must not be more than 20 characters"],
    minLength: [3, "A last-name must be at least 3 characters"],
    trim: true,
  },
  userName: {
    type: String,
    required: [true, "Username field is required for all users"],
    unique: [true, "A user with this username already exist"],
  },
  email: {
    type: String,
    required: [true, "Email field is required for all users"],
    validate: [validator.isEmail, "Please enter a valid email"],
    trim: true,
    lowerCase: true,
    unique: [true, "A user with this email already exist"],
  },
  phoneNumber: String,
  address: {
    type: String,
    required: [true, "Address is required for all users"],
  },
  password: {
    type: String,
    required: [true, "A user must have an password"],
    select: false,
    minLength: [8, "Password must ba at least 8 characters"],
    validate: {
      validator: function (val) {
        return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])[A-Za-z\d]{8,}/.test(val);
      },
      message:
        "Password must contain at least a number, a lowercase and an uppercase alphabeth",
    },
  },
  passwordConfirm: {
    type: String,
    required: [true, "A user must have an passwordConfirm"],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Password and confirm password are different",
    },
    select: false,
  },
  timeStamp: true,
};

module.exports = User;
