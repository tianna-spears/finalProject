const getDashboard = async (req, res) => {
  try {
    const displayUserName = req.user.firstName
    res.json(`Hi, ${displayUserName}! Welcome to your dashboard.`);
  } catch (err) {
    res.status(500).json({error: 'There was an issue with the server. Please try again.'})
  }
};

const displayCourse = async (req, res) => {
  try {
    const displayCourseName = req.user.courseName
    res.json(`You are currently enrolled in the course: ${displayCourseName}!`);
  } catch (err) {
    res.status(500).json({error: 'There was an issue with the server. Please try again.'})
  }
};


module.exports = {getDashboard, displayCourse}
