var express = require("express");
var courseRouter = express.Router();
/** 1- declare mongoose and course **/
const mongoose = require("mongoose");
let course = require("../models/course");

var Verify = require("./verify");

courseRouter
  .route("/")
  .get(Verify.verifyOrdinaryUser, function (req, res, next) {
    //chained into route(), no semi-colon after the all implementation
    // 2- implement get  to return all course
    course.find({}, (err, course) => {
      //get the course collection as an array,received as the course param
      if (err) throw err; //propagate error
      // convert to json and return in res
      res.json(course);
    });
  })

  .post(Verify.verifyOrdinaryUser, function (req, res, next) {
    // 3- implement post request to insert course into database
    course.create(req.body, (err, course) => {
      if (err) throw err; //propagate error

      console.log("course created");
      var id = course._id;
      res.writeHead(200, { "Content-Type": "text-plain" }); //send reply back to the client with course id
      res.end("Added the course with id: " + id);
    });
  })

  .delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    // 4- delete deletes all course in the collection
    course.remove({}, (err, resp) => {
      if (err) throw err; //propagate error

      res.json(resp);
    });
  });
courseRouter
  .route("/:courseId")
  .all(Verify.verifyOrdinaryUser)
  .get(function (req, res, next) {
    course.findById(req.params.courseId, (err, course) => {
      if (err) throw err;

      res.json(course);
    });
  })

  .put(function (req, res, next) {
    course.findById(req.params.courseId, (err, course) => {
      if (err) throw err;
      course.findByIdAndUpdate(req.params.courseId, (err, course) => {
        if (err) throw err;
        res.json(course);
        console.log("Put operation completed");
      });
    });
  })

  .delete(Verify.verifyAdmin, function (req, res, next) {
    course.findById(req.params.courseId, (err, course) => {
      course.course_name.remove(); //remove a single comment
      course.save((err, resp) => {
        if (err) throw err;
        res.json(resp);
      });
    });
  });
courseRouter
  .route("/:courseId/:course_name")
  .all(Verify.verifyOrdinaryUser)
  .get(function (req, res, next) {
    course.findById(req.params.courseId, (err, course) => {
      if (err) throw err;

      res.json(course.course_name);
    });
  })

  .put(function (req, res, next) {
    course.findById(req.params.courseId, (err, course) => {
      if (err) throw err;
      course.course_name.remove();
      course.course_name.push(req.body);
      course.save((err, course) => {
        if (err) throw err;
        console.log("course updated");
        res.json(course);
      });
    });
  })

  .delete(function (req, res, next) {
    course.findById(req.params.courseId, (err, course) => {
      course.course_name.remove(); //remove a single comment
      course.save((err, resp) => {
        if (err) throw err;
        res.json(resp);
      });
    });
  });
courseRouter
  .route("/:courseId/:instructor")
  .all(Verify.verifyOrdinaryUser)
  .get(function (req, res, next) {
    course.findById(req.params.courseId, (err, course) => {
      if (err) throw err;

      res.json(course.instructor);
    });
  })

  .put(function (req, res, next) {
    course.findById(req.params.courseId, (err, course) => {
      if (err) throw err;
      course.instructor.remove();
      course.instructor.push(req.body);
      course.save((err, course) => {
        if (err) throw err;
        console.log("course instructor updated");
        res.json(course);
      });
    });
  })

  .delete(function (req, res, next) {
    course.findById(req.params.courseId, (err, course) => {
      course.instructor.remove(); //remove a single comment
      course.save((err, resp) => {
        if (err) throw err;
        res.json(resp);
      });
    });
  });
courseRouter
  .route("/:courseId/:semester")
  .all(Verify.verifyOrdinaryUser)
  .get(function (req, res, next) {
    course.findById(req.params.courseId, (err, course) => {
      if (err) throw err;

      res.json(course.semester);
    });
  })

  .put(function (req, res, next) {
    course.findById(req.params.courseId, (err, course) => {
      if (err) throw err;
      course.semester.remove();
      course.semester.push(req.body);
      course.save((err, course) => {
        if (err) throw err;
        console.log("course semester updated");
        res.json(course);
      });
    });
  })

  .delete(function (req, res, next) {
    course.findById(req.params.courseId, (err, course) => {
      course.semester.remove(); //remove a single comment
      course.save((err, resp) => {
        if (err) throw err;
        res.json(resp);
      });
    });
  });
courseRouter
  .route("/:courseId/:credit")
  .all(Verify.verifyOrdinaryUser)
  .get(function (req, res, next) {
    course.findById(req.params.courseId, (err, course) => {
      if (err) throw err;

      res.json(course.credit);
    });
  })

  .put(function (req, res, next) {
    course.findById(req.params.courseId, (err, course) => {
      if (err) throw err;
      course.credit.remove();
      course.credit.push(req.body);
      course.save((err, course) => {
        if (err) throw err;
        console.log("course credit updated");
        res.json(course);
      });
    });
  })

  .delete(function (req, res, next) {
    course.findById(req.params.courseId, (err, course) => {
      course.credit.remove(); //remove a single comment
      course.save((err, resp) => {
        if (err) throw err;
        res.json(resp);
      });
    });
  });
courseRouter
  .route("/:courseId/students")
  .all(Verify.verifyOrdinaryUser)
  .get(function (req, res, next) {
    course.findById(req.params.courseId, (err, course) => {
      if (err) throw err;

      res.json(course.students);
    });
  })

  .put(function (req, res, next) {
    course.findById(req.params.courseId, (err, course) => {
      if (err) throw err;
      course.students.remove();
      course.students.push(req.body);
      course.save((err, course) => {
        if (err) throw err;
        console.log("course students updated");
        res.json(course);
      });
    });
  })

  .delete(function (req, res, next) {
    course.findById(req.params.courseId, (err, course) => {
      course.students.remove(); //remove a single comment
      course.save((err, resp) => {
        if (err) throw err;
        res.json(resp);
      });
    });
  });
courseRouter
  .route("/:courseId/students/:studentId")
  .all(Verify.verifyOrdinaryUser)
  .get(function (req, res, next) {
    course.findById(req.params.courseId, (err, course) => {
      if (err) throw err;

      res.json(course.students.id(req.params.studentId));
    });
  })

  .put(function (req, res, next) {
    course.findById(req.params.courseId, (err, course) => {
      if (err) throw err;
      course.students.id(req.params.studentId).remove();
      course.students.id(req.params.studentId).push(req.body);
      course.save((err, course) => {
        if (err) throw err;
        console.log("course students updated");
        res.json(course);
      });
    });
  })

  .delete(function (req, res, next) {
    course.findById(req.params.courseId, (err, course) => {
      course.students.id(req.params.studentId).remove(); //remove a single comment
      course.save((err, resp) => {
        if (err) throw err;
        res.json(resp);
      });
    });
  });

module.exports = courseRouter;
