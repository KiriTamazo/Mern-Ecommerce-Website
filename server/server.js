import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

// Mongoose
mongoose.set("strictQuery", true);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};
// Listen
app.listen(port, () => {
  connect();
  console.log("listening on port " + port);
});
