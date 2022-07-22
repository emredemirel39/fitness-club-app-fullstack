const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({

    hour: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    lesson: {
        type: String,
        required: true
    },
    trainer: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Event', EventSchema);