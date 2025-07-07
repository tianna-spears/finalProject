const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Please provide email and password." });
  }
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(404)
        .json({ message: `User with ${email} not found. Please try again.` });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect password." });
    }

    // JWT goes here bc user is found in database and logged in
    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
        firstName: existingUser.firstName,
        courseName: existingUser.courseName,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "168h" }
    );

    const { password: _, ...userWithoutPassword } = existingUser.toObject();
    
    res.status(200).json({
      message: "Login successful!",
      user: userWithoutPassword,
      token,
    });
  } catch (err) {
    return res.status(500).json({ error: "Server error. Please try again." });
  }
};

module.exports = userLogin;
