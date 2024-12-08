const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const busRoutes = require('./routes/bus');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/bus', busRoutes);

mongoose.connect('mongodb://localhost:27017/BusQuick',{ })
.then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));