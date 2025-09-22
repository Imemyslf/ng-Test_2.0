const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  adminDataId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  previlegeSuperAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model("Admin", adminSchema);
