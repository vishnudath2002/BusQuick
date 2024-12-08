const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
    departure: { type: String, required: true },
    arrival: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    type: { type: String, required: true },
    operator: { type: String, required: true },
    amenities: { type: [String], required: true }
});

module.exports = mongoose.model('Bus', busSchema);
