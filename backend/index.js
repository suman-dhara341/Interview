const express = require("express");
const app = express();
const port = 3000;
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
require("dotenv").config();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", authRoutes);
app.use("/api", taskRoutes);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
