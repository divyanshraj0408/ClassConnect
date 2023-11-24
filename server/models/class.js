const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  classCode: { type: String, required: true },
  creator: { type: mongoose.Types.ObjectId, required: true },
  assignment: [
    { type: mongoose.Types.ObjectId, required: true, ref: "Assignment" },
  ],
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Class", classSchema);
