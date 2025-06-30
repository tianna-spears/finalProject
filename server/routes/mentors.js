const express = require("express");
const router = express.Router();

const {
  createMentorEvent,
  getMentors,
  updateMentors,
  deleteMentors
} = require('../controllers/mentors')

router.post("/", createMentorEvent);
router.get("/", getMentors);
router.patch("/:id", updateMentors);
router.delete("/:id", deleteMentors);

module.exports = router;

