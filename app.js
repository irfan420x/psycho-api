const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const botRoutes = require('./routes/botRoutes');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// MongoDB এর জন্য কনফিগারেশন
mongoose.connect('mongodb://localhost/psycho-api', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

// Bot routes সংযোগ করা
app.use('/api/bot', botRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
