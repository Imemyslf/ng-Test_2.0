const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

dbConnect();

const app = express();
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//Middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  const _FORWARD_IP = req.get("x-forwarded-for");
  console.log("_FORWARD_IP (CLIENT IP ADDRESS):", _FORWARD_IP);
  console.dir(req.headers);
  next();
});

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
});
