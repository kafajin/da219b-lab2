const mongoose = require("mongoose");

// Schema for assigning an employee to a project
const projectAssignmentSchema = new mongoose.Schema({
  // Reference to an employee (ObjectId from Employee collection)
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },

  // Reference to a project (ObjectId from Project collection)
  project_code: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },

  // Date the employee started on the project (defaults to today)
  start_date: {
    type: Date,
    default: Date.now,
  },
});

// Export the model for use in the app
module.exports = mongoose.model("ProjectAssignment", projectAssignmentSchema);
