require("dotenv").config();

const express = require("express");
const app = express();
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const dashboardRoute = require("./routes/dashboard");
const dataInputRoute = require("./routes/dataInput")
const connectDB = require("./database/connectDB");

// middleware
const authMiddleware = require('./middleware/auth')
app.use(express.json());

const PORT = process.env.PORT || 3001;

// routes
app.get("/", (req, res) => {
  res.send("It worked!");
});

app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/dashboard", authMiddleware, dashboardRoute);
app.use("/dataInput", authMiddleware, dataInputRoute)

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