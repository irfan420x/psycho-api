const express = require('express');
const app = express();
const port = 5500;

// Root endpoint ("/") - Homepage response
app.get('/', (req, res) => {
    res.send('Welcome to my API!');
});

// API endpoint ("/your-api-endpoint")
app.get('/your-api-endpoint', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
