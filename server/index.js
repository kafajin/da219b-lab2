// Import core modules
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Load environment variables from root .env file
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

console.log("✅ DEBUG: MONGODB_URI =", process.env.MONGODB_URI);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to allow cross-origin requests and parse JSON
app.use(cors());
app.use(express.json());

// Import routes
const employeeRoutes = require("./routes/employees");
const projectRoutes = require("./routes/projects");
const assignmentRoutes = require("./routes/assignments");

// Register route handlers
app.use("/api/employees", employeeRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/project_assignments", assignmentRoutes);

// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Simple health check route
app.get("/", (req, res) => {
  res.send("Server is running and connected to DB!");
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
