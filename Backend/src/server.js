const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

dbConnect();

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
});
