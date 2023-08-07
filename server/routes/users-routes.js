const express = require("express");
const { check } = require("express-validator");

const HttpError = require("../models/http-error");
const userController = require("../controllers/users-controller");

const router = express.Router();

router.post(
  "/login",
  [check("email").not().isEmpty(), check("password").not().isEmpty()],
  userController.userLogin
); // /api/users/login ==> to login a user
router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  userController.userSignup
); // /api/users/signup ==> to signup a user

module.exports = router;
