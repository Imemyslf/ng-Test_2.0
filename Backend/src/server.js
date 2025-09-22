const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use(cors());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

dbConnect(() => {
  app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`);
  });
});
