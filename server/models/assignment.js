const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: String, required: false },
  classId: { type: mongoose.Types.ObjectId, required: true, ref: "Class" },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});
module.exports = mongoose.model("Assignment", assignmentSchema);
