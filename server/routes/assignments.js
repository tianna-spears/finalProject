const express = require("express");
const router = express.Router();
const {
  createAssignments,
  getAllAssignments,
  updateAssignments,
  deleteAssignments
} = require('../controllers/assignments')

router.post("/", createAssignments);
router.get("/", getAllAssignments);
router.patch("/:id", updateAssignments);
router.delete("/:id", deleteAssignments)

module.exports = router;
