const Course = require("../models/Course");
const User = require("../models/User");

const createCourses = async (req, res) => {
  const { courseName, courseDates } = req.body;
  if (!courseName || !courseDates) {
    return res
      .status(400).json({ error: "Please insert all required fields." });
  }
  const existingCourse = await Course.findOne({ courseName });
  if (existingCourse) {
    return res.status(409).json({ error: `Course (${courseName}) already exists.` });
  }
  try {
    const newCourse = new Course({ courseName, courseDates });
    await newCourse.save();
    res.status(201).json(`Course ${courseName} was successfully created!`);
  } catch (err) {
    res.status(500).send("There was an issue creating your course. Please try again later.");
  }
};

const getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find();
    res.status(200).json(allCourses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserByCourseID = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Course ID field is required." });
    }
    const findUser = await User.find({ courseID: id })
      .populate("courseID", "courseName")
      .select("firstName lastName courseID");

    if (findUser.length === 0) {
      return res.status(404).json({
        message: `There are currently no students enrolled in course ID: ${id}`,
      });
    }
    res.status(200).json(findUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCourses = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  if (!id) {
    return res.status(400).json({ error: "Please enter Course ID." });
  }

  try {
    const updatedCourse = await Course.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found." });
    }
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCourses = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Please enter Course ID." });
  }

  try {
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ error: "Course does not exist." });
    }
    res
      .status(200)
      .json({ message: `Course ${deletedCourse.courseName} is now deleted.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCourses,
  getAllCourses,
  getUserByCourseID,
  updateCourses,
  deleteCourses,
};
