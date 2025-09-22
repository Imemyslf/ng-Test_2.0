const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");
const adminController = require("../controllers/adminController");
const reviewerController = require("../controllers/reviwer");
const employeeController = require("../controllers/employeeController");
const router = express.Router();
const upload = require("../middleware/upload");

//admin: acess by only one role
//Testing Auth and Role
router.get("/admin", verifyToken, authorizeRole("admin"), (req, res, next) => {
  res.json({ message: `Welcome Admin` });
});

//Fetching all employees data
router.get(
  "/admin/get-employees",
  verifyToken,
  authorizeRole("admin"),
  adminController.getEmployees
);

//Fetching All Task assigned to an Employee
router.get(
  "/:employeeId/tasks",
  verifyToken,
  authorizeRole("admin", "reviewer", "employee"),
  adminController.getAllTask
);

//Creating a task
router.post(
  "/admin/:employeeId/create-task",
  verifyToken,
  authorizeRole("admin"),
  adminController.postTask
);

router.put(
  "/admin/update-task/:taskId",
  verifyToken,
  authorizeRole("admin"),
  adminController.updateTask
);

router.delete(
  "/admin/delete-task/:taskId",
  verifyToken,
  authorizeRole("admin"),
  adminController.deleteTask
);

//manager: access by only two role
//Testing Auth and Role
router.get(
  "/reviewer",
  verifyToken,
  authorizeRole("admin", "reviewer"),
  (req, res, next) => {
    res.json({ message: `Welcome reviewer` });
  }
);

router.get(
  "/reviewer/get-employees",
  verifyToken,
  authorizeRole("admin", "reviewer"),
  reviewerController.getEmployees
);

router.get(
  "/reviewer/completed-tasks/:employeeId",
  verifyToken,
  authorizeRole("admin", "reviewer"),
  reviewerController.getTasks
);

//Employee: access by all
//Testing Auth and Role
router.get(
  "/employee",
  verifyToken,
  authorizeRole("admin", "reviewer", "employee"),
  (req, res, next) => {
    res.json({ message: `Welcome User` });
  }
);

//Fetching All Task assigned to an Employee
router.get(
  "/tasks",
  verifyToken,
  authorizeRole("admin", "reviewer", "employee"),
  employeeController.getAllTask
);

router.put(
  "/task/:taskId",
  verifyToken,
  authorizeRole("employee"),
  employeeController.updateStatus
);

router.post(
  "/task/:taskId/upload",
  verifyToken,
  authorizeRole("employee"),
  upload.single("report"),
  employeeController.uploadFile
);

router.get("/super-admin/get-all-users", adminController.getAllUsers);

module.exports = router;
