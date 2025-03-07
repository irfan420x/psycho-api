const express = require('express');
const router = express.Router();
const botController = require('../controllers/botController');

// নতুন রিপ্লাই যোগ করা
router.post('/add-reply', botController.addReply);

// রিপ্লাই পাওয়া
router.get('/get-replies/:message', botController.getReplies);

// রিপ্লাই আপডেট করা
router.put('/update-reply', botController.updateReply);

module.exports = router;
