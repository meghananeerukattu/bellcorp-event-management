const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");

const app = express();

console.log("Before DB connection...");
connectDB();
console.log("After DB connection call...");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
