const express = require('express');
const app = express();
const port = 5000;

// আপনার API রুট
app.get('/your-api-endpoint', (req, res) => {
    res.json({ message: 'API is working!' });
});

// সার্ভার স্টার্ট
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
