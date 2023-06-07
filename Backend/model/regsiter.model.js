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
    age:Number
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Registration = mongoose.model("Data", registrationSchema);
module.exports = 
    Registration

