const mongoose = require("mongoose");

const MentorSession = new mongoose.Schema({
  mentor: {
    type: String,
    required: true,
  },
  sessionDate: {
    type: String,
    required: true,
  }
});
  
module.exports = mongoose.model("MentorSession", MentorSession);
