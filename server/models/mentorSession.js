const mongoose = require('mongoose')

const mentorSession = new mongoose.Schema({
    mentorName: {
        type: String,
        required: true
    },
    sessionDateAndTime: {
        type: Date,
        required: true
    },
    scheduled: {
        type: Boolean,
        required: true
    },
    assignmentDue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment'
    },
})

module.exports = mongoose.model('mentorSession', mentorSession)