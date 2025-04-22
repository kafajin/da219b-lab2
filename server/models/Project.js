const mongoose = require("mongoose");

// Schema for a project in the system
const projectSchema = new mongoose.Schema({
  // Unique project identifier (e.g., P001)
  project_code: {
    type: String,
    unique: true,
    required: true,
  },

  // Name of the project (e.g., Website Redesign)
  project_name: {
    type: String,
    required: true,
  },

  // Optional description of the project
  project_description: {
    type: String,
  },
});

// Export the model for use in the app
module.exports = mongoose.model("Project", projectSchema);
