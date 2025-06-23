// get/ display profile
// update profile
// delete profile


// needs to be protected (authentication)

const getProfileByID = async (req, res) => {
  res.send("Get Profile");
};

const updateProfileByID = async (req, res) => {
  res.send("Update Profile");
};

const deleteProfileByID = async (req, res) => {
  res.send("Delete Profile ");
};

module.exports = {
  getProfileByID,
  updateProfileByID,
  deleteProfileByID,
};
