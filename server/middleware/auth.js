require("dotenv").config();
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. Invalid or expired token." });
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = { userId: payload.userId, email: payload.email, firstName: payload.firstName };
    next();
  } catch (error) {
    return res.status(401).json({ error: "Access denied. Invalid or expired token." });
  }
};

module.exports = authMiddleware;
