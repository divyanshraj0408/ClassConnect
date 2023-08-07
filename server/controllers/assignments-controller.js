const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Assignments = require("../models/assignment");
// const User = require("../models/user");
// const Class = require("../models/class");

let DUMMY_ASSIGNMENTS = [
  // Dummy data, later to be replaced by data from database
  {
    id: "a1",
    title: "Assignment 1",
    description: "Assignment 1 description",
    creator: "u1",
    classId: "c1",
  },
];

const getAssignments = async (req, res, next) => {
  // /api/assignments/ ==> to get all assignments
  try {
    const assignments = await Assignments.find();

    res.json({ assignments });
  } catch {
    res.status(500).json({ error: "Error fetching assignments" });
  }
};

const getAssignmentById = (req, res, next) => {
  // /api/assignments/:assignmentId ==> to get assignment with a specific id
  const assignmentId = req.params.aid; // Use req.params.assignmentId instead of req.params.aid
  const assignment = DUMMY_ASSIGNMENTS.find((a) => {
    return a.id === assignmentId;
  });
  if (!assignment) {
    throw new HttpError(
      "Could not find a assignment for the provided id.",
      404
    );
  }
  res.json({ assignment });
};
const createAssignment = async (req, res, next) => {
  // /api/assignments/ ==> to submit an assignment
  const { title, description, creator, classId } = req.body;
  const createdAssignment = new Assignments({
    title,
    description,
    creator,
    classId,
  });
  try {
    await createdAssignment.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Creating assignment failed, please try again.",
      500
    );
    return next(error);
  }
  res
    .status(201)
    .json({ assignment: createdAssignment.toObject({ getters: true }) });
};

const deleteAssignment = (req, res, next) => {
  // /api/assignments/:assignmentId ==> to delete an assignment with a specific id
  const assignmentId = req.params.aid; // Use req.params.assignmentId instead of req.params.aid
  DUMMY_ASSIGNMENTS = DUMMY_ASSIGNMENTS.filter((a) => a.id !== assignmentId);
  if (!assignmentId) {
    throw new HttpError(
      "Could not find a assignment for the provided id.",
      404
    );
  }
  res.status(200).json({ message: "Deleted assignment." });
};
exports.getAssignments = getAssignments;
exports.getAssignmentById = getAssignmentById;
exports.createAssignment = createAssignment;
exports.deleteAssignment = deleteAssignment;
