const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/admin", verifyToken, authorizeRole("admin"), (req, res, next) => {
  res.json({ message: `Welcome Admin` });
});

router.get(
  "/manager",
  verifyToken,
  authorizeRole("admin", "manager"),
  (req, res, next) => {
    res.json({ message: `Welcome Manager` });
  }
);

router.get(
  "/user",
  verifyToken,
  authorizeRole("admin", "manager", "user"),
  (req, res, next) => {
    res.json({ message: `Welcome User` });
  }
);

module.exports = router;
