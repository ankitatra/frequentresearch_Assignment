const express = require('express');
const stateRoutes= express.Router();
const Country = require('../model/country.modal');
const State = require('../model/state.modal');


stateRoutes.get('/countries/:countryId/states', async (req, res) => {
  try {
    const states = await State.find({ country: req.params.countryId });
    res.json(states);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch states' });
  }
});


stateRoutes.post('/countries/:countryId/states', async (req, res) => {
  try {
    const { name } = req.body;
    const state = new State({ name, country: req.params.countryId });
    await state.save();
    res.status(201).json(state);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create state' });
  }
});



module.exports=stateRoutes
