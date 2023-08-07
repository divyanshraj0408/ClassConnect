const HttpError = require("../models/http-error");

let DUMMY_ASSIGNMENTS = [
  // Dummy data, later to be replaced by data from database
  {
    id: "a1",
    title: "Assignment 1",
    description: "Assignment 1 description",
    creator: "u1",
    class: "c1",
    dueDate: "2021-05-01",
    dueTime: "23:59",
    points: 100,
    submissions: ["s1", "s2", "s3"],
  },
];

const getAssignments = (req, res, next) => {
  // /api/assignments/ ==> to get all assignments
  res.json({ assignments: DUMMY_ASSIGNMENTS });
};
const submitAssignment = (req, res, next) => {
  // /api/assignments/ ==> to submit an assignment
  const { title, description, creator, classroom, dueDate, dueTime, points } =
    req.body;
  const createdAssignment = {
    id: uuidv4(),
    title: title,
    description: description,
    creator: creator,
    classroom: classroom,
    dueDate: dueDate,
    dueTime: dueTime,
    points: points,
  };
};
