var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var courseRouter = require("./routes/course-router");
var userRouter = require("./routes/user-router");
var scheduleRouter = require("./routes/schedule-router");
var mongoose = require("mongoose");
// Connection URL
var url =
  "mongodb+srv://admin:admin123@cluster0-uoxlf.mongodb.net/users?retryWrites=true&w=majority";

// Connect using mongoose
mongoose.connect(url, { useNewUrlParser: true });
//open a connection and get a db handler
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/courses", courseRouter);
app.use("/users", userRouter);
app.use("/schedules", scheduleRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
