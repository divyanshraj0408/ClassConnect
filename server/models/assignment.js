const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: String, required: false },
  classId: { type: String, required: true },
  creator: { type: String, required: true },
});
module.exports = mongoose.model("Assignment", assignmentSchema);
