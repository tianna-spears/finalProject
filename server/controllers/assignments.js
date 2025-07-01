const Course = require("../models/Course");
const Assignment = require("../models/Assignment");

const createAssignments = async (req, res) => {
  try {
    // console.log("Request body:", req.body); 
    const { title, dueDate, courseID, lesson } = req.body;
    // console.log('Received courseID:', courseID);
    if (!title || !dueDate || !courseID || !lesson) {
      return res
        .status(400)
        .json({ error: "Please insert all required fields." });
    }
    const findCourse = await Course.findById(courseID);

    if (!findCourse) {
      return res.status(404).json({ error: "Course not found." });
    }

    const newAssignment = new Assignment({
      title,
      dueDate,
      lesson,
      courseID,
    });
    // console.log("Received courseID:", courseID);
    await newAssignment.save();

    res.status(201)
      .json(
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
    const getAssignments = await Assignment.find()
      .populate("courseID")
      .sort("dueDate");
    res.status(200).json(getAssignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateAssignments = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!id) {
    return res.status(400).json({ error: "Please provide assignment ID." });
  }

  try {
    const updatedAssignment = await Assignment.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedAssignment) {
      return res.status(404).json({ error: "Assignment not found." });
    }

    res.status(200).json(updatedAssignment);
  } catch (error) {
    console.error("Error updating assignment:", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteAssignments = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Please provide assignment ID." });
  }

  try {
    const deletedAssignment = await Assignment.findByIdAndDelete(id);

    if (!deletedAssignment) {
      return res.status(404).json({ error: "Assignment not found." });
    }

    res
      .status(200)
      .json({ message: `Assignment ${deletedAssignment.title} deleted.` });
  } catch (error) {
    console.error("Error deleting assignment:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAssignments,
  getAllAssignments,
  updateAssignments,
  deleteAssignments,
};
