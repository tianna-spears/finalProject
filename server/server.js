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
app.use(cors());

const PORT = 3000;

// routes
app.get("/", (req, res) => {
  res.send("It worked!");
});

app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/dashboard", authMiddleware, dashboardRoute);
app.use("/quotes", quotesAPIRoute)
app.use("/courses", coursesRoute)
app.use("/mentors", mentorsRoute)
app.use("/assignments", assignmentsRoute)


const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`)
        })
    } catch (err) {
        console.log('Error starting the server.', err.message)
    }
};

start()