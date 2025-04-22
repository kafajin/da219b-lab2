const mongoose = require("mongoose");

// Schema for a project in the system
const projectSchema = new mongoose.Schema({
  project_code: {
    type: String,
    unique: true,
    required: true,
  },

  // Website Redesign)
  project_name: {
    type: String,
    required: true,
  },

  //  description of the project
  project_description: {
    type: String,
  },
});

// Export the model for use in the app
module.exports = mongoose.model("Project", projectSchema);
