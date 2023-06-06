const { validationResult } = require('express-validator');
const {Register} = require('../model/regsiter.model');

const registrationController = (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

  const registrationData = req.body;

  // Save the registration data to MongoDB
//   const registration = new Register(registrationData);
//   registration.save((err, savedRegistration) => {
//     if (err) {
//       console.error('Error saving registration:', err);
//       res.status(500).json({ error: 'Failed to save registration' });
//     } else {
//       res.json(savedRegistration);
//     }
//   });
};

module.exports = {
    registrationController,
  };
