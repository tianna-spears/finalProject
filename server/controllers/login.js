const bcrypt = require("bcrypt");
const User = require("../models/User");

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

    const isPasswordValid = await bcrypt.compare(password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect password." });
    }
    const { password: _, ...userWithoutPassword } = existingUser.toObject();
    res
      .status(200)
      .json({ message: "Login successful!", user: userWithoutPassword });
  } catch (err) {
    return res.status(500).json({ error: "Server error. Please try again." });
  }
};

module.exports = userLogin;
