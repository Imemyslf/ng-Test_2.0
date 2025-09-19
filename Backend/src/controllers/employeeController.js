const Employee = require("../models/employee");

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
