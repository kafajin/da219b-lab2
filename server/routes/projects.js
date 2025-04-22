const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

/**
 * @route   POST /api/projects
 * @desc    Add a new project to the database
 * @access  Public
 */
router.post("/", async (req, res) => {
  const { project_code, project_name, project_description } = req.body;

  try {
    // Check for duplicate project code
    const exists = await Project.findOne({ project_code });
    if (exists)
      return res.status(400).json({ message: "Project code already exists" });

    // Create and save the new project
    const project = new Project({
      project_code,
      project_name,
      project_description,
    });
    await project.save();

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
