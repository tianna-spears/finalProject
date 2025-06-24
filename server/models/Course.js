const mongoose = require("mongoose");

const Course = new mongoose.Schema({
  courseName: {
    type: String,
    enum: [
      "Intro to Programming",
      "React.js",
      "Node/Express",
      "Ruby on Rails",
      "Python",
    ],
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
});

module.exports = mongoose.model("Course", Course);
