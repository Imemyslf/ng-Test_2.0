const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewerSchema = new Schema(
  {
    reviewerDataId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    assignedEmployee: [
      {
        type: Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Reviewer", reviewerSchema);
