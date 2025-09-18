exports.getUser = (req, res, next) => {
  console.log("Inisde getUser");
  res.status(200).json({ message: "Success from Get User" });
};
