const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// MongoDB সংযোগ
mongoose.connect('mongodb://localhost:27017/psychoAPI', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.log('MongoDB connection error:', err);
});

const app = express();
const port = 8080;  // এখানে পোর্ট 8080 ব্যবহার করা হয়েছে

// Middleware
app.use(bodyParser.json()); // JSON body parsing middleware

// MongoDB Schema এবং Model
const teachSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

const Teach = mongoose.model('Teach', teachSchema);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

// /api/teach (POST) - টিচ ফাইল সেভ করার রাউট
app.post('/api/teach', async (req, res) => {
  const { title, content } = req.body;
  
  // নতুন টিচ ডাটা তৈরি করে MongoDB তে সেভ করা
  const newTeach = new Teach({
    title,
    content
  });

  try {
    const savedTeach = await newTeach.save();
    res.status(201).json({ message: 'Teach file saved!', data: savedTeach });
  } catch (error) {
    res.status(400).json({ message: 'Error saving teach file', error });
  }
});

// /api/teach (GET) - সেভ করা ফাইল থেকে টিচ অনুযায়ী রিপ্লাই করা
app.get('/api/teach', async (req, res) => {
  const { title } = req.query;  // URL থেকে title প্যারামিটার নিন
  
  try {
    const teach = await Teach.findOne({ title });
    if (teach) {
      res.status(200).json({ message: 'Teach file found!', data: teach });
    } else {
      res.status(404).json({ message: 'Teach file not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teach file', error });
  }
});

// Server চালানো
app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
