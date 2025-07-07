const User = require("../models/User");
const Course = require("../models/Course");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, courseName } = req.body;
console.log("Register request body:", req.body);


// require all input fields to register  
  if (!firstName || !lastName || !email || !password || !courseName) {
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
       const courseNum = await Course.findOne({ courseName });
    if (!courseNum) {
      return res.status(404).json({ error: `Course (${courseName}) not found.` });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      courseID: courseNum._id,
    });

    await newUser.save();

        const token = jwt.sign(
      {
        userId: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        courseName: courseName,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2h" }
    );
      console.log("Sending token and user data:", { token, newUser })
    res.status(201).json({
      message: "User successfully created!",
      token,
      user: {
      ...newUser.toObject(),
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Server error. New user not created." });
  }
};

module.exports = registerUser;
