const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const classesRoutes = require("./routes/classes-routes");
const usersRoutes = require("./routes/users-routes");
const assignmentsRoutes = require("./routes/assignments-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  // CORS error handling
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all domains
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  ); // Allow these headers
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE"); // Allow these methods
  next();
});

app.use("/api/classes", classesRoutes); // => /api/classes...
app.use("/api/users", usersRoutes); // => /api/users...
app.use("/api/assignments", assignmentsRoutes); // => /api/assignments...

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
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.ridpgao.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      try {
        console.log("Server is running on port 5000");
      } catch (err) {
        console.log(err);
      }
    });
  })
  .catch();
