// const express = require('express');
// const { body } = require('express-validator');
// const registrationController= require('../controller/registration.controller');

// const registrationRoutes = express.Router();
// Define the registration route
// registrationRoutes.post('/',registrationController.register
// );
//   [
//     body('email').isEmail().withMessage('Invalid email format'), // Validation for email field
//     // Add more validation rules for other fields if needed
//   ],

// module.exports =registrationRoutes;

const express = require("express");
const { check, validationResult } = require("express-validator");
const Registration = require("../model/regsiter.model");

const router = express.Router();



router.post(
  "/",
  [
    check('email')
      .isEmail().withMessage('Invalid email address'),
    check('firstName')
      .matches(/^[A-Za-z]+$/).withMessage('First name must contain alphabets only'),
      check('lastName')
      .matches(/^[A-Za-z]+$/).withMessage('Last name must contain alphabets only'),
    // ... other validation rules for other fields
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
   
      const register = new Registration(req.body);
      await register.save();
      res.status(201).json({ message: "Registration successful" });
    } catch (error) {
      res.status(500).json({ message: "An error occurred while registering" });
    }
  }
);

module.exports = router;
