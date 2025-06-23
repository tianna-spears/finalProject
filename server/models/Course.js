const mongoose = require("mongoose");

const Course = new mongoose.Schema({
  courseName: {
    type: String,
    unique: true,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  assignments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
    },
  ],
  mentorSessions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MentorSession",
    },
  ],
  calendar: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Calendar'
    },
  ],
});

module.exports = mongoose.model("Course", Course);
