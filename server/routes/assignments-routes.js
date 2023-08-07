const express = require("express");

const HttpError = require("../models/http-error");
const assignmentsControllers = require("../controllers/assignments-controller");

const router = express.Router();

router.get("/", assignmentsControllers.getAssignments); // /api/assignments/ ==> to get all assignments
router.get("/:aid", assignmentsControllers.getAssignmentById); // /api/assignments/a1 ==> to get assignment with id a1
router.post("/", assignmentsControllers.createAssignment); // /api/assignments/ ==> to create a new assignment
router.delete("/:aid", assignmentsControllers.deleteAssignment); // /api/assignments/a1 ==> to delete a assignment with id a1

module.exports = router;
