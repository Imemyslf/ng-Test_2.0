const express = require("express");
const authController = require("../controllers/authController");
const multer = require("multer");
const upload = require("../middleware/upload");

const router = express.Router();

//Used by Super Admin to create Admin, Reviewer and Employee
router.post(
  "/register",
  upload.single("profileImage"),
  authController.register
);

//Used by Admin, Reviewer and Employee to login
router.post("/login", authController.login);

module.exports = router;
