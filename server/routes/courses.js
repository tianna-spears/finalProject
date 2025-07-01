const express = require("express")
const router = express.Router()
const {
  createCourses,
  getAllCourses,
  getUserByCourseID,
  updateCourses,
  updateUserCourse,
  deleteCourses
} = require('../controllers/courses')

router.post("/", createCourses);
router.get("/", getAllCourses);
router.get("/:id", getUserByCourseID);
router.patch("/:id", updateCourses)
router.patch("/user/:id", updateUserCourse)
router.delete("/:id", deleteCourses)

module.exports = router;
