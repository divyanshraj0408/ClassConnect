const bcrypt = require("bcryptjs");
const HttpError = require("../models/http-error");
const jwt = require("jsonwebtoken");
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

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Creating user failed, its not you its us, please try again! ;(",
      500
    );
    return next(error);
  }
  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
  });
  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Creating user failed, please try again.", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.email,
      },
      process.env.JWT_TOKEN,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Creating user failed, please try again.", 500);
    return next(error);
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
};

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
  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check the password and try again",
      500
    );
  }
  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }
  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_TOKEN,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("logging in failed, please try again.", 500);
    return next(error);
  }
  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};

exports.userLogin = userLogin;
exports.userSignup = userSignup;
