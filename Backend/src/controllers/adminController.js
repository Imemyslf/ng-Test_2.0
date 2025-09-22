const Employee = require("../models/employee");
const Admin = require("../models/admin");
const Reviewer = require("../models/reviwer");
const Task = require("../models/task");

exports.getAllUsers = async (req, res, next) => {
  console.log("Inside getAllUsers");
  try {
    const employees = await Employee.find().populate("user");
    const admins = await Admin.find().populate("adminDataId");
    const reviewers = await Reviewer.find().populate("reviewerDataId");
    if (!employees && !admins && !reviewers) {
      return res.status(404).json({ message: "No users found", users: [] });
    }
    // console.log(employees, admins, reviewers);
    res.status(200).json({
      message: "Users fetched successfully",
      employees: employees || [],
      admins: admins || [],
      reviewers: reviewers || [],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
      employess: [],
      admins: [],
      reviewers: [],
    });
  }
};

exports.getAllTask = async (req, res, next) => {
  const employeeId = req.params.employeeId;
  console.log(employeeId);
  try {
    const employee = await Employee.findById(employeeId).populate("tasks");
    if (!employee) {
      res
        .status(404)
        .json({ message: `User not found with id ${employeeId}`, tasks: [] });
    }
    console.log(employee);
    res
      .status(200)
      .json({ message: `User id: ${employeeId}`, tasks: employee.tasks });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error", tasks: [] });
  }
};

exports.getEmployees = (req, res, next) => {
  console.log("Inisde getUser");

  Employee.find()
    .populate("user")
    .then((employees) => {
      // console.log(employees);
      const transformedEmployee = employees.map((e) => {
        return {
          id: e._id,
          username: e.user.username,
          name: e.user.name,
          profileImage: e.user.profileImage,
        };
      });
      console.log(transformedEmployee);
      res.status(200).json({
        message: "Employee Fetched Successfully",
        users: transformedEmployee,
      });
    })
    .catch((err) => {
      console.log("\n\n Error from getUser \n", err);
      res.status(500).json({ message: "Internal Server Erro", user: [] });
    });
};

exports.postTask = async (req, res, next) => {
  try {
    const { title, description, deadline, priority, status } = req.body;
    const assignedTo = req.params.employeeId;
    const assignedBy = req.user.id;
    console.log(
      title,
      description,
      deadline,
      priority,
      status,
      assignedTo,
      assignedBy
    );

    const newTask = await Task.create({
      title,
      description,
      deadline,
      priority,
      status,
      assignedTo,
      assignedBy,
    });

    console.log(newTask);
    let updatedUser;
    Employee.findById(assignedTo)
      .then((user) => {
        console.log(user);
        if (!user) {
          console.log(`User not found`);
        }
        user.tasks.push(newTask._id);
        console.log(user);
        return user.save();
      })
      .catch((err) => console.log(err));
    res.status(200).json({
      message: "Inside postTask",
      task: newTask,
      user: updatedUser || [],
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Internal Server Error", task: {}, users: [] });
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { title, description, deadline, priority, status } = req.body;
    console.log(taskId, title, description, deadline, priority, status);

    const task = await Task.findById(taskId);
    console.log("OldTask:", task);
    if (!task) {
      return res.status(404).json({ message: "Task not found", task: {} });
    }

    task.title = title;
    task.description = description;
    task.deadline = deadline;
    task.priority = priority;
    task.status = status;

    console.log("Updated Task:", task);

    const result = await task.save();
    console.log(result);

    res.status(200).json({ message: "Task updated successfully", task: task });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error", task: {} });
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    console.log(taskId);
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found", task: {} });
    }

    const employee = await Employee.findById(task.assignedTo);
    if (employee) {
      employee.tasks = employee.tasks.filter(
        (id) => id.toString() !== taskId.toString()
      );
      await employee.save();
    }
    await Task.findByIdAndDelete(taskId);
    res
      .status(200)
      .json({ message: `Task deleted successfully with task id ${taskId}` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error", task: {} });
  }
};
