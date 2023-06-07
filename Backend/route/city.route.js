const express = require('express');
const cityRoutes = express.Router();
const City = require('../model/city.modal');


cityRoutes.get('/states/:stateId/cities', async (req, res) => {
  try {
    const cities = await City.find({ state: req.params.stateId });
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cities' });
  }
});


cityRoutes.post('/states/:stateId/cities', async (req, res) => {
  try {
    const { name } = req.body;
    const city = new City({ name, state: req.params.stateId });
    await city.save();
    res.status(201).json(city);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create city' });
  }
});



module.exports=cityRoutes
