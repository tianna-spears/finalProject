const mongoose = require("mongoose");

const MentorSession = new mongoose.Schema({
  mentor: {
    type: String,
    required: true,
  },
  sessionDateAndTime: {
    type: Date,
    required: true,
  }
});
  
module.exports = mongoose.model("MentorSession", MentorSession);
