const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");
const adminController = require("../controllers/adminController");
const employeeController = require("../controllers/employeeController");
const router = express.Router();

//admin: acess by only one role
router.get("/admin", verifyToken, authorizeRole("admin"), (req, res, next) => {
  res.json({ message: `Welcome Admin` });
});

router.get(
  "/admin/get-user",
  verifyToken,
  authorizeRole("admin"),
  adminController.getUsers
);

router.post("/admin/create-post", adminController.postTask);

//manager: access by only two role
router.get(
  "/reviewer",
  verifyToken,
  authorizeRole("admin", "reviewer"),
  (req, res, next) => {
    res.json({ message: `Welcome reviewer` });
  }
);

//user: access by all
router.get(
  "/employee",
  verifyToken,
  authorizeRole("admin", "reviewer", "employee"),
  (req, res, next) => {
    res.json({ message: `Welcome User` });
  }
);

router.get(
  "/:employeeId/tasks",
  verifyToken,
  authorizeRole("admin", "reviewer", "employee"),
  employeeController.getAllTask
);

module.exports = router;
