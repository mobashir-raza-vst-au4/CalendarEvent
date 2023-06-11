const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    dateTime: {
        type: Number,
        required: true,
    },
    is_mail_sent: {
        type: Boolean,
        default: false,
    },
    timezone: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);