const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true }, // Name of the user
  email: { type: String, required: true, unique: true }, // Email of the user
  password: { type: String, required: true, minlength: 6 }, // Password of the user
  classes: [{ type: mongoose.Types.ObjectId, required: true, ref: "Class" }], // Classes the user is enrolled in
  assignments: [
    { type: mongoose.Types.ObjectId, required: true, ref: "Assignment" },
  ], // Assignments the user has submitted
});
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
