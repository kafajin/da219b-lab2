// No need for dotenv if you're hardcoding the URI (just for this test)
const mongoose = require("mongoose");

const MONGODB_URI =
  "mongodb+srv://NoraKafaji:zESfMIBQ9DLWFmey@cluster0.85v9sh5.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected successfully to MongoDB!");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Connection failed:", err);
  });
