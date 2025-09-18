const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECT_STRING);
    console.log(
      `Database Connected to ${connect.connection.host} ${connect.connection.user}`
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = dbConnect;
