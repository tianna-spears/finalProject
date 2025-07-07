require("dotenv").config();

const express = require("express");
const app = express();
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const dashboardRoute = require("./routes/dashboard");
const quotesAPIRoute = require("./routes/quotesAPI");
const coursesRoute = require("./routes/courses");
const mentorsRoute = require("./routes/mentors");
const assignmentsRoute = require("./routes/assignments");
const connectDB = require("./database/connectDB");
const cors = require('cors');

// middleware
const authMiddleware = require('./middleware/auth');
app.use(express.json());

app.use(cors({
  origin: "https://client-finalproject-ew1x.onrender.com"
}));

// fixing issue with Chai and Express Rendering Engine
app.use((req, res, next) => {
  if (req.path == "/multiply") {
    res.set("Content-Type", "application/json");
  } 
  next();
});

// index route
app.get("/", (req, res) => {
  res.send("Testing website!");
});

// testing route API
app.get("/multiply", (req, res) => {
  const result = req.query.first * req.query.second;
  if (result.isNaN) {
    result = "NaN";
  } else if (result == null) {
    result = "null";
  }
  res.json({ result: result });
});

// routes
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/dashboard", authMiddleware, dashboardRoute);
app.use("/quotes", quotesAPIRoute)
app.use("/courses", coursesRoute)
app.use("/mentors", mentorsRoute)
app.use("/assignments", assignmentsRoute)

const port = process.env.PORT || 3000;

const start = () => {
  try {
    connectDB()
    return app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`),
    );
  } catch (error) {
    console.log(error);
  }
};

start();

module.exports = { app };

