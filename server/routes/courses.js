const express = require("express")
const router = express.Router()
const {
  createCourses,
  getAllCourses,
  getUserByCourseID,
  updateCourses,
  deleteCourses
} = require('../controllers/courses')

router.post("/", createCourses);
router.get("/", getAllCourses);
router.get("/:id", getUserByCourseID);
router.patch("/:id", updateCourses)
router.delete("/:id", deleteCourses)

module.exports = router;
