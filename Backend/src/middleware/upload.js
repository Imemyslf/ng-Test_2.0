const multer = require("multer");
const path = require("path");

// Storage for PDF reports
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // if it's a PDF -> save in reports
    if (file.mimetype === "application/pdf") {
      cb(null, "uploads/report");
    } else {
      cb(null, "uploads/users");
    }
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + "-" + file.fieldname + ext);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/webp" ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Only .jpeg, .jpg, .png, .webp, and .pdf files are allowed!"),
      false
    );
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
