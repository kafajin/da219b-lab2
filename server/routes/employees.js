const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

// POST /api/employees
// Adds a new employee to the database
router.post("/", async (req, res) => {
  const { employee_id, full_name, email, hashed_password } = req.body;

  try {
    // Check if employee_id already exists
    const exists = await Employee.findOne({ employee_id });
    if (exists)
      return res.status(400).json({ message: "Employee ID already exists" });

    // Create and save new employee
    const employee = new Employee({
      employee_id,
      full_name,
      email,
      hashed_password,
    });
    await employee.save();

    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
