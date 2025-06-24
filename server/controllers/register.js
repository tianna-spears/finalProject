const User = require("../models/User");

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: "Please fill in all fields."});
  }
  const newUser = new User({ firstName, lastName, email, password })
  await newUser.save();

  res.status(201).json({message: "User successfully created!", user: newUser});
};

module.exports = registerUser;
