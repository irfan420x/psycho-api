const Reply = require('../models/replyModel');

// নতুন রিপ্লাই যোগ করা
exports.addReply = async (req, res) => {
    const { message, replies } = req.body;
    
    try {
        const newReply = new Reply({ message, replies });
        await newReply.save();
        res.status(201).json(newReply);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// একটি বার্তার সমস্ত রিপ্লাই দেখানো
exports.getReplies = async (req, res) => {
    const { message } = req.params;

    try {
        const replies = await Reply.find({ message });
        if (!replies) {
            return res.status(404).json({ message: 'No replies found' });
        }
        res.status(200).json(replies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// বার্তা রিপ্লাই আপডেট করা
exports.updateReply = async (req, res) => {
    const { message, newReply } = req.body;

    try {
        const updatedReply = await Reply.findOneAndUpdate(
            { message },
            { $set: { replies: newReply } },
            { new: true }
        );
        if (!updatedReply) {
            return res.status(404).json({ message: 'Reply not found' });
        }
        res.status(200).json(updatedReply);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
