const mongoose = require("mongoose");

const MentorEvent = new mongoose.Schema({
  mentor: {
    type: String,
    required: true,
  },
  sessionDate: {
    type: String,
    required: true,
  }
});
  
module.exports = mongoose.model("MentorEvent", MentorEvent);
