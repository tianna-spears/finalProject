const Course = require("../models/Course");
const Assignment = require("../models/Assignment");
const MentorSession = require("../models/MentorSession");

const getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find({}, "courseName");
    res.status(200).json(allCourses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createCourse = async (req, res) => {
  const { courseName, courseDates } = req.body;
  if (!courseName || !courseDates) {
    return res
      .status(400)
      .json({ error: "Please insert all required fields." });
  }
  const existingCourse = await Course.findOne({ courseName });
  if (existingCourse) {
    return res.status(409).json({ error: `Course (${courseName}) already exists.` });
  }

  try {
    const newCourse = new Course({ courseName, courseDates });
    await newCourse.save();
    res.status(200).send(`Course ${courseName} was successfully created!`);
  } catch (err) {
    res
      .status(500)
      .send("There was an issue creating your course. Please try again later.");
  }
};

const createAssignment = async (req, res) => {
  try {
    const { title, dueDate, courseName, lesson } = req.body;
    if (!title || !dueDate || !courseName || !lesson) {
      return res
        .status(400)
        .json({ error: "Please insert all required fields." });
    }
    // lets sort this to find the course by name first, then connect title and due date then save
    const findCourse = await Course.findOne({ courseName });

    if (!findCourse) {
      return res.status(404).json({ error: "Course not found." });
    }

    const newAssignment = new Assignment({
      title,
      dueDate,
      course: findCourse._id,
      lesson,
    });
    await newAssignment.save();

    res
      .status(200)
      .send(
        `Assignment ${title} with a due date of: ${dueDate} was successfully created!`
      );
  } catch (err) {
    console.error("Error creating assignment:", err);
    res
      .status(500)
      .send(
        "There was an issue creating your assignment. Please try again later."
      );
  }
};

const getAllAssignments = async (req, res) => {
  try {
    const getAssignments = await Assignment.find().populate('course').sort('dueDate');
    res.status(200).json(getAssignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createMentorSession = async (req, res) => {
  try {
    const { mentor, sessionDateAndTime } = req.body;
    if (!mentor || !sessionDateAndTime) {
      return res
        .status(400)
        .json({ error: "Please insert all required fields." });
    }
    const newMentorSession = new MentorSession({ mentor, sessionDateAndTime });
    await newMentorSession.save();
    res.status(200)
      .send(`Mentor session with ${mentor} on ${sessionDateAndTime} was successfully created!
        Please remember that this mentor session needs to be completed prior to turning in your assignment.`);
  } catch (err) {
    res
      .status(500)
      .send(
        "There was an issue creating your mentor session. Please try again later."
      );
  }
};

module.exports = {
  getAllAssignments,
  getAllCourses,
  createCourse,
  createAssignment,
  createMentorSession,
};
