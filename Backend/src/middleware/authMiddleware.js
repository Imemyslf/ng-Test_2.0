const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;
  console.log("\n\n AuthHeader \n", authHeader);
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    console.log(token);
    if (!token) {
      res.status(401).json({ message: `No Token, Authorization deined` });
    }
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;
      console.log("\n\n The decode user is:- ", req.user);
      next();
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Token is not valid" });
    }
  }
};

module.exports = verifyToken;
