const {mongoConnectionString} = require('../config/config');
const incidentModel = require('../models/incidentModel');
const express = require('express');
const {countries} = require('countries-list');

const mongoose = require('mongoose');
mongoose.connect(mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });

const incidentRouter = express.Router();

incidentRouter.get('/get-incident', getIncident);
incidentRouter.get('/get-countries', getCountries);
incidentRouter.post('/update-incident', updateIncident);


async function getIncident(req) {
    const findQuery = {incidentId: req.incidentId};
    const incident = await incidentModel.findOne(findQuery);
    return incident;
}

async function updateIncident(req) {
    const updateQuery = {
        status: req.body.status,
        priority: req.body.priority,
        country: req.body.country,
        operations: req.body.operations
    }
    await incidentModel.update(req.body.incidentId, updateQuery);
}

function getCountries() {
    
    const countriesWithEmojies = [];
    Object.entries(countries).forEach(([key, value]) => {
        countriesWithEmojies.push({
            countryName: key.toLowerCase(),
            emoji: value.emoji
        });
    });
    return countriesWithEmojies;
}


module.exports = incidentRouter;