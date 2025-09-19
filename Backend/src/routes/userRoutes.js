const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");
const adminController = require("../controllers/adminController");

const router = express.Router();

//admin: acess by only one role
router.get("/admin", verifyToken, authorizeRole("admin"), (req, res, next) => {
  res.json({ message: `Welcome Admin` });
});

router.get(
  "/admin/get-user",
  verifyToken,
  authorizeRole("admin"),
  adminController.getUser
);

router.post("/admin/create-post", adminController.postTask);

//manager: access by only two role
router.get(
  "/manager",
  verifyToken,
  authorizeRole("admin", "manager"),
  (req, res, next) => {
    res.json({ message: `Welcome Manager` });
  }
);

//user: access by all
router.get(
  "/user",
  verifyToken,
  authorizeRole("admin", "manager", "employee"),
  (req, res, next) => {
    res.json({ message: `Welcome User` });
  }
);

module.exports = router;
