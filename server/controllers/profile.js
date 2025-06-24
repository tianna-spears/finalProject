const mongoose = require('mongoose')
const User= require('../models/User')


const getProfileByID = async (req, res) => {
  res.json("User Profile Here");
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
