const express = require('express');
const Bus = require('../models/Bus');
const router = express.Router();

router.get('/search', async (req, res) => {
    const { departure, arrival, date, type, operator, amenities } = req.query;

    try {
        let query = { departure, arrival, date };
        if (type) query.type = type;
        if (operator) query.operator = operator;
        if (amenities) query.amenities = { $all: amenities.split(',') };

        const buses = await Bus.find(query);
        res.status(200).json(buses);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

module.exports = router;
