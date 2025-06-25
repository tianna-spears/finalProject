const User = require('../models/User')
const Assignment = require('../models/Assignment');

const getGreeting = async (req, res) => {
  try {
    const displayUserName = req.user.firstName
    res.json(`Hi, ${displayUserName}! Welcome to your dashboard.`);
  } catch (err) {
    res.status(500).json({error: 'There was an issue with the server. Please try again.'})
  }
};

const getDashboard = async (req, res) => {
  try {
    const getUserID = req.user.userId

    const getUserDashboard = await User.findById(getUserID).populate('courseID', 'courseName')
      if (!getUserDashboard) {
        res.status(404).json({error: 'There was an error loading the dashboard. Please try again.'})
      }

      const assignments = await Assignment.find(
        { courseID: getUserDashboard.courseID._id }).sort({dueDate: 1})

      res.status(200).json({ 
      user: {
        name: getUserDashboard.firstName,
        courseName: getUserDashboard.courseID.courseName,
        courseID: getUserDashboard.courseID._id.toString()
      },
      assignments
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'There was an issue with the server. Please try again.' });
  }
};

module.exports = {getGreeting, getDashboard}
