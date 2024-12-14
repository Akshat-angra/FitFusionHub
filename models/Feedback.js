// models/Feedback.js
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    message: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
