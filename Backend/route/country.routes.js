const express = require('express');
const countryRoutes = express.Router();
const Country = require('../model/country.modal');


countryRoutes.get('/countries/all', async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


countryRoutes.post('/countries', async (req, res) => {
  try {
    const { name } = req.body;
    const country = new Country({ name });
    await country.save();
    res.status(201).json(country);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create country' });
  }
});



module.exports=countryRoutes