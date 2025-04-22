const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const Employee = require("./models/Employee");
const Project = require("./models/Project");
const ProjectAssignment = require("./models/ProjectAssignment");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB for seeding...");

    // Clear collections
    await Employee.deleteMany({});
    await Project.deleteMany({});
    await ProjectAssignment.deleteMany({});

    // Insert employees
    const employees = await Employee.insertMany([
      {
        employee_id: "E001",
        full_name: "Alice Andersson",
        email: "alice@example.com",
        hashed_password: "pass1",
      },
      {
        employee_id: "E002",
        full_name: "Bob Berg",
        email: "bob@example.com",
        hashed_password: "pass2",
      },
      {
        employee_id: "E003",
        full_name: "Carla Carlsson",
        email: "carla@example.com",
        hashed_password: "pass3",
      },
      {
        employee_id: "E004",
        full_name: "David Dahl",
        email: "david@example.com",
        hashed_password: "pass4",
      },
      {
        employee_id: "E005",
        full_name: "Eva Ek",
        email: "eva@example.com",
        hashed_password: "pass5",
      },
    ]);

    // Insert projects
    const projects = await Project.insertMany([
      {
        project_code: "P001",
        project_name: "Website Redesign",
        project_description: "UI/UX update",
      },
      {
        project_code: "P002",
        project_name: "Mobile App",
        project_description: "iOS + Android",
      },
      {
        project_code: "P003",
        project_name: "Internal Tool",
        project_description: "Admin dashboard",
      },
      {
        project_code: "P004",
        project_name: "Marketing Site",
        project_description: "Landing page",
      },
      {
        project_code: "P005",
        project_name: "Data Analysis",
        project_description: "Data insights",
      },
    ]);

    // Insert assignments
    await ProjectAssignment.insertMany([
      { employee_id: employees[0]._id, project_code: projects[0]._id },
      { employee_id: employees[1]._id, project_code: projects[1]._id },
      { employee_id: employees[2]._id, project_code: projects[2]._id },
      { employee_id: employees[3]._id, project_code: projects[3]._id },
      { employee_id: employees[4]._id, project_code: projects[4]._id },
    ]);

    console.log("✅ Seeding complete!");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  });
