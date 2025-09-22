const Employee = require("../models/employee");
const Task = require("../models/task");

exports.getAllTask = async (req, res, next) => {
  try {
    console.log("The user from token is:- ", req.user);
    const employee = await Employee.findOne({ user: req.user.id }).populate(
      "tasks"
    );
    console.log(employee);
    if (!employee) {
      res
        .status(404)
        .json({ message: `User not found with id ${req.user.id}`, tasks: [] });
    }
    res
      .status(200)
      .json({ message: `User id: ${req.user.id}`, tasks: employee.tasks });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error", tasks: [] });
  }
};

exports.updateStatus = async (req, res, next) => {
  const { taskId } = req.params;
  const { status } = req.body;
  console.log(taskId, status);

  try {
    const task = await Task.findById(taskId);
    console.log("OldTask:", task);
    if (!task) {
      return res.status(404).json({ message: "Task not found", task: {} });
    }
    task.status = status;
    const updatedTask = await task.save();
    console.log("Updated Task:", updatedTask);
    res.status(200).json({ message: "Task status updated", task: updatedTask });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const taskId = req.params.taskId;
    const filePath = req.file.path;

    // Update task with report path
    const updatedTask = await Task.findById(taskId);
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    updatedTask.fileupload = filePath;
    updatedTask.status = "completed";
    await updatedTask.save();
    console.log("Updated Task with Report:", updatedTask);

    res.json({
      message: "Report uploaded successfully",
      task: updatedTask,
    });
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};
