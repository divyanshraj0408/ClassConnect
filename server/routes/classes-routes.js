const express = require("express");
const { check } = require("express-validator");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const classesControllers = require("../controllers/classes-controller");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.use(checkAuth);

router.get("/", classesControllers.getClasses); // /api/classes/ ==> to get all classes

router.get("/:cid", classesControllers.getClassById); // /api/classes/c1 ==> to get class with id c1

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("creator").not().isEmpty(),
  ],
  classesControllers.createClass
); // /api/classes/ ==> to create a new class

router.post("/join", classesControllers.joinClass); // /api/classes/join ==> to join a class with id c1

router.delete("/:cid", classesControllers.deleteClass); // /api/classes/c1 ==> to delete a class with id c1

module.exports = router;
