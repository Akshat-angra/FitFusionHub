const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;
