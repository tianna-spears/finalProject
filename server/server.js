require("dotenv").config();

const express = require("express");
const app = express();
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const dashboardRoute = require("./routes/dashboard");
const dataInputRoute = require("./routes/dataInput")
const quotesAPIRoute = require("./routes/quotesAPI")
const connectDB = require("./database/connectDB");
const cors = require('cors')

// middleware
const authMiddleware = require('./middleware/auth')
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

const PORT = process.env.PORT || 3001;

// routes
app.get("/", (req, res) => {
  res.send("It worked!");
});

app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/dashboard", authMiddleware, dashboardRoute);
app.use("/dataInput", authMiddleware, dataInputRoute)
app.use("/quotes", authMiddleware, quotesAPIRoute)

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