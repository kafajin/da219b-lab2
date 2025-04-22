const express = require("express");
const router = express.Router();
const ProjectAssignment = require("../models/ProjectAssignment");

/**
 * @route   POST /api/project_assignments
 * @desc    Assign an employee to a project
 * @access  Public
 */
router.post("/", async (req, res) => {
  const { employee_id, project_code, start_date } = req.body;

  try {
    // Create and save the new assignment
    const assignment = new ProjectAssignment({
      employee_id,
      project_code,
      start_date,
    });
    await assignment.save();

    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @route   GET /api/project_assignments
 * @desc    Fetch all project assignments with populated employee/project info
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const assignments = await ProjectAssignment.find()
      .populate("employee_id", "employee_id full_name")
      .populate("project_code", "project_code project_name");

    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
