const User = require("../models/user");
const Employee = require("../models/employee");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const { name, username, password, role } = req.body;
    console.log(name, username, password, role);

    const hashPass = await bcrypt.hash(password, 10);
    console.log(hashPass);
    const newUser = await User.create({
      name,
      username,
      password: hashPass,
      role,
    });
    console.log(newUser);

    if (role === "employee") {
      const newEmployee = await Employee.create({
        user: newUser._id,
        task: {},
      });

      console.log(newEmployee);
    }
    res
      .status(201)
      .json({ message: `User Registered with username ${username}` });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);

    const user = await User.findOne({ username });
    console.log(user);

    if (!user) {
      res
        .status(404)
        .json({ message: `User not found with username ${username}` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: `Inavlid Credtials` });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log(token);
    res.status(200).json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
