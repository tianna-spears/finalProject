const User = require("../models/User");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

// require all input fields to register  
  if (!firstName || !lastName || !email || !password) {
    return res
      .status(400)
      .json({ error: "Please fill in all required fields." });
  }

// check if user already exists in database by checking email
const existingUser = await User.findOne( { email })
  if (existingUser) {
    return res.status(400).json({ error: `User with email ${email} already exists. Please login instead.` })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User successfully created!", user: newUser });
  } catch (err) {
    res.status(500).json({ error: "Server error. New user not created." });
  }
};

module.exports = registerUser;
