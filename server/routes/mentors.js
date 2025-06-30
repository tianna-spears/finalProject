const express = require("express");
const router = express.Router();

const getMentors = require('../controllers/mentors')

router.get("/", getMentors);

// router.post("/", createMentorEvent);
// router.patch("/:id", updateMentors);
// router.delete("/:id", deleteMentors);

module.exports = router;

