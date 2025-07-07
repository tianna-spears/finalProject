require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    let mongoURL = process.env.MONGODB_URI;
    if (process.env.NODE_ENV == "test") {
      mongoURL = process.env.MONGODB_URI_TEST;
    }
    await mongoose.connect(mongoURL);
    console.log("Database is connected!");
  } catch (err) {
    console.log("Error connecting to database.", err.message);
  }
};

module.exports = connectDB;
