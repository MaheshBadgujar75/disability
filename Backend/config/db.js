// FILE: db/connection.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    console.error("Error Details:", {
      name: error.name,
      code: error.code,
      codeName: error.codeName,
    });
    process.exit(1);
  }
};

module.exports = connectDB;