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
  courseDates: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Course", Course);
