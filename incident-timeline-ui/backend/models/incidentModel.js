var mongoose = require('mongoose');

const Schema = mongoose.Schema;

let incidentSchema = new Schema({
    incidentId: String,
    priority: String,
    status: String,
    country: String,
    createdAt: Date,
    operations: Array
});

const Incidents = mongoose.model('Incidents', incidentSchema);

module.exports = Incidents;