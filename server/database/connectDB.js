require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database is connected!");
  } catch (err) {
    console.log("Error connecting to database.", err.message);
  }
};

module.exports = connectDB;
