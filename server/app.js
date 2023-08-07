const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const classesRoutes = require("./routes/classes-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/classes", classesRoutes); // => /api/classes...
app.use("/api/users", usersRoutes); // => /api/users...

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurred!" });
}); // Error handling middleware

mongoose
  .connect(
    "mongodb+srv://divyanshraj0408:u9RCthNP-$g!8dY@classconnect.ridpgao.mongodb.net/classConnect?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000, () => {
      try {
        console.log("Server is running on port 5000");
      } catch (err) {
        console.log(err);
      }
    });
  })
  .catch();
