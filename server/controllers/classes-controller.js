const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Class = require("../models/class");
const User = require("../models/user");

let DUMMY_CLASSES = [
  // Dummy data, later to be replaced by data from database
  {
    id: "c1",
    title: "Class 1",
    description: "Class 1 description",
    creator: "u1",
  },
];

const getClasses = async (req, res, next) => {
  try {
    // Find all classes
    const classes = await Class.find();

    // Return the classes as JSON response
    res.json({ classes });
  } catch (err) {
    // Handle any errors that occurred during the query
    res.status(500).json({ error: "Error fetching classes" });
  }
};

const getClassById = async (req, res, next) => {
  // /api/classes/:classId ==> to get class with a specific id
  const classId = req.params.cid; // Use req.params.classId instead of req.params.cid
  let classInfo;
  try {
    classInfo = await Class.findById(classId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a class.",
      500
    );
    return next(error);
  }
  if (!classInfo) {
    const error = new HttpError(
      "Could not find a class for the provided id.",
      404
    );
    return next(error);
  }
  res.json({ classInfo: classInfo.toObject({ getters: true }) });
};

const createClass = async (req, res, next) => {
  // /api/classes/ ==> to create a new class

  const errors = validationResult(req); // Check if there are any validation errors
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  const { title, description, classCode, creator } = req.body;
  const createdClass = new Class({
    title,
    description,
    classCode,
    creator,
  });

  let user;

  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError(
      "Creating class failed, please try again.",
      500
    );
  }
  if (!user) {
    const error = new HttpError("Could not find user for provided id.", 404);
    return next(error);
  }
  console.log(user);
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdClass.save({ session: sess });
    user.classes.push(createdClass);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Creating class failed, please try again.",
      500
    );
    return next(error);
  }
  res.status(201).json({
    createClass: createdClass,
  });
};

const joinClass = async (req, res, next) => {
  // /api/classes/join ==> to join an existing class

  const { classCode, userId } = req.body;

  // Validate input, if needed
  if (!classCode || !userId) {
    const error = new HttpError(
      "Invalid inputs passed, please check your data.",
      422
    );
    return next(error);
  }

  let user, classToJoin;

  try {
    // Find the user
    user = await User.findById(userId);
    if (!user) {
      const error = new HttpError("Could not find user for provided id.", 404);
      return next(error);
    }

    classToJoin = await Class.findById(classCode);

    if (!classToJoin) {
      const error = new HttpError(
        "Class not found for the provided code.",
        404
      );
      return next(error);
    }

    if (user.classes.includes(classToJoin._id)) {
      const error = new HttpError(
        "User is already a member of this class.",
        422
      );
      return next(error);
    }

    const sess = await mongoose.startSession();
    sess.startTransaction();

    user.classes.push(classToJoin);
    classToJoin.members.push(user);

    await user.save({ session: sess });
    await classToJoin.save({ session: sess });

    await sess.commitTransaction();
  } catch (err) {
    console.error(err);
    const error = new HttpError("Joining class failed, please try again.", 500);
    return next(error);
  }

  res
    .status(200)
    .json({ message: "Successfully joined the class.", class: classToJoin });
};

const deleteClass = async (req, res, next) => {
  const classId = req.params.cid;

  try {
    // Delete the class from the classes collection
    await Class.deleteOne({ _id: classId });

    // Find all users who were associated with the deleted class
    const usersToUpdate = await User.find({ classes: classId });

    // Remove the class reference from each user's document
    for (const user of usersToUpdate) {
      user.classes = user.classes.filter((c) => c.toString() !== classId);
      await user.save();
    }

    res.status(200).json({ message: "Deleted class and updated users." });
  } catch (error) {
    console.error("Error deleting class:", error);
    res.status(500).json({ message: "Error deleting class." });
  }
};

exports.getClasses = getClasses;
exports.getClassById = getClassById;
exports.createClass = createClass;
exports.deleteClass = deleteClass;
exports.joinClass = joinClass;
