const Employee = require("../models/employee");
const Task = require("../models/task");

exports.getUsers = (req, res, next) => {
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
    console.log(title, description, deadline, priority, status);

    const newTask = await Task.create({
      title,
      description,
      deadline,
      priority,
      status,
    });
    console.log(newTask);
    let updatedUser;
    Employee.findById("68cd0061d4519a04c93ac058")
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
      message: "inside postTask",
      task: newTask,
      user: updatedUser || [],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error", task: {} });
  }
};
