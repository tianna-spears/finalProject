const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log("Auth Header:", authHeader);
  // console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);
  // if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //   return res
  //     .status(401)
  //     .json({ error: "Access denied. Invalid or expired token." });
  // }
if (!authHeader) {
    console.log("No authorization header");
    return res.status(401).json({ error: "No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = {
      userId: payload.userId,
      email: payload.email,
      firstName: payload.firstName,
      courseName: payload.courseName,
    };
    next();
  } catch (error) {
    console.error("JWT error:", error);

    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token expired. Please login again." });
    }
    return res.status(401).json({ message: "Unauthorized: Invalid token." });
  }
};

module.exports = authMiddleware;
