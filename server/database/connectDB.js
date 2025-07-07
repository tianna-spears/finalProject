const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./env") });

const express = require("express");
const app = express();
const mongoose = require("mongoose");

// to be able to run tests in testing directory
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
