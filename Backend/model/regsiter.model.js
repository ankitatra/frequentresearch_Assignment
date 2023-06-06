const mongoose = require("mongoose");
const registrationSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    country: String,
    state: String,
    city: String,
    gender: String,
    dateOfBirth: Date,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Register = mongoose.model("Register", registrationSchema);
module.exports = {
  Register,
};
