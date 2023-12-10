const { v4: uuidv4 } = require("uuid");

const HttpError = require("../models/http-error");
const User = require("../models/user");

let DUMMY_USERS = [
  // Dummy data, later to be replaced by data from database
  {
    id: "u1",
    name: "User 1",
    email: "abc@example.com",
    password: "abc",
    classes: ["c1", "c2"],
  },
];
const userLogin = async (req, res, next) => {
  // /api/users/login ==> to login a user
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Loggin in failed, please try again later.",
      500
    );
    return next(error);
  }
  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }

  res.json({
    message: "Logged in!",
    user: existingUser.toObject({ getters: true }),
  });
};

const userSignup = async (req, res, next) => {
  // /api/users/signup ==> to signup a user
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }
  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password,
  });
  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Creating user failed, please try again.", 500);
    return next(error);
  }
  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};
exports.userLogin = userLogin;
exports.userSignup = userSignup;
