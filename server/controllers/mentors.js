const MentorEvent = require("../models/MentorEvent");

const getMentors = async (req, res) => {
  try {
    const sessions = await MentorEvent.find();
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// const createMentorEvent = async (req, res) => {
//   try {
//     const { mentor, sessionDate, sessionTime } = req.body;
//     if (!mentor || !sessionDate || !sessionTime) {
//       return res
//         .status(400)
//         .json({ error: "Please insert mentor, sessionDate, and sessionTime." });
//     }
//     const newMentorSession = new MentorEvent({ mentor, sessionDate, sessionTime });
//     await newMentorSession.save();
//     res.status(200).send(`Mentor session with ${mentor} on ${sessionDate} at ${sessionTime} was successfully created! Please remember that this mentor session needs to be completed prior to turning in your assignment.`);
//   } catch (err) {
//     res.status(500).send("There was an issue creating your mentor session. Please try again later.");
//   }
// };


// const updateMentors = async (req, res) => {
//   const { id } = req.params;
//   const updates = req.body;

//   if (!id) {
//     return res.status(400).json({ error: "Please provide the mentor session ID." });
//   }

//   try {
//     const updatedSession = await MentorEvent.findByIdAndUpdate(id, updates, { new: true });

//     if (!updatedSession) {
//       return res.status(404).json({ error: "Mentor session not found." });
//     }

//     res.status(200).json(updatedSession);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const deleteMentors = async (req, res) => {
//   const { id } = req.params;

//   if (!id) {
//     return res.status(400).json({ error: "Please provide the mentor session ID." });
//   }

//   try {
//     const deletedSession = await MentorEvent.findByIdAndDelete(id);

//     if (!deletedSession) {
//       return res.status(404).json({ error: "Mentor session not found." });
//     }

//     res.status(200).json({ message: `Mentor session for ${deletedSession.mentor} on ${deletedSession.sessionDate} at ${deletedSession.sessionTime} deleted.` });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


module.exports = getMentors;
