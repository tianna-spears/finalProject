const mongoose = require("mongoose");

const Assignment = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  lesson: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Assignment", Assignment);
