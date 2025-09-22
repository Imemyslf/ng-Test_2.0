const Employee = require("../models/employee");
const Task = require("../models/task");

exports.getEmployees = async (req, res, next) => {
  try {
    console.log("Inisde getUser");

    Employee.find()
      .populate("user")
      .then((employees) => {
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
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error", tasks: [] });
  }
};

exports.getTasks = async (req, res, next) => {
  const { employeeId } = req.params;
  console.log("The user from token is:- ", req.user.role);
  try {
    let tasks;

    const employee = await Employee.findById(employeeId).populate("tasks");
    if (employee) {
      tasks = employee.tasks.filter((task) => task.status === "completed");
    }

    if (tasks) {
      return res.status(200).json({
        message: "Task fetched successfully",
        tasks: [tasks],
      });
    } else {
      return res.status(200).json({
        message: "Tasks fetched successfully (excluding completed)",
        tasks: tasks,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error", tasks: [] });
  }
};
