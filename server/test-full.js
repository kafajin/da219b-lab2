const path = require("path");
console.log("🧪 CWD:", process.cwd());
console.log("🧪 dirname:", __dirname);

// Attempt to load .env from root
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

console.log("✅ TEST: MONGODB_URI =", process.env.MONGODB_URI);

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected successfully to MongoDB from full test!");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Failed to connect from full test:", err);
    process.exit(1);
  });
