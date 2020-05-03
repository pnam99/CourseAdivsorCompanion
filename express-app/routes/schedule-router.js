var express = require("express");
var scheduleRouter = express.Router();
/** 1- declare mongoose and schedule **/
const mongoose = require("mongoose");
let schedule = require("../models/schedule");

var Verify = require("./verify");

scheduleRouter
  .route("/")
  .get(Verify.verifyOrdinaryUser, function (req, res, next) {
    //chained into route(), no semi-colon after the all implementation
    // 2- implement get  to return all schedule
    schedule.find({}, (err, schedule) => {
      //get the schedule collection as an array,received as the schedule param
      if (err) throw err; //propagate error
      // convert to json and return in res
      res.json(schedule);
    });
  })

  .post(Verify.verifyOrdinaryUser, function (req, res, next) {
    // 3- implement post request to insert schedule into database
    schedule.create(req.body, (err, schedule) => {
      if (err) throw err; //propagate error

      console.log("schedule created");
      var id = schedule._id;
      res.writeHead(200, { "Content-Type": "text-plain" }); //send reply back to the client with schedule id
      res.end("Added the schedule with id: " + id);
    });
  })

  .delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    // 4- delete deletes all schedule in the collection
    schedule.remove({}, (err, resp) => {
      if (err) throw err; //propagate error

      res.json(resp);
    });
  });
scheduleRouter
  .route("/:scheduleId/:courseId")
  .all(Verify.verifyOrdinaryUser)
  .get(function (req, res, next) {
    schedule.findById(req.params.scheduleId, (err, schedule) => {
      if (err) throw err;

      res.json(schedule.course.id(req.params.courseId));
    });
  })

  .put(function (req, res, next) {
    schedule.findById(req.params.scheduleId, (err, schedule) => {
      if (err) throw err;
      schedule.course.id(req.params.courseId).remove();
      schedule.course.id(req.params.courseId).push(req.body);
      schedule.save((err, schedule) => {
        if (err) throw err;
        console.log("Schedule updated");
        res.json(schedule);
      });
    });
  })

  .delete(Verify.verifyAdmin, function (req, res, next) {
    schedule.findById(req.params.scheduleId, (err, schedule) => {
      schedule.course.id(req.params.courseId).remove(); //remove a single comment
      schedule.save((err, resp) => {
        if (err) throw err;
        res.json(resp);
      });
    });
  });
scheduleRouter
  .route("/:scheduleId")
  .all(Verify.verifyOrdinaryUser)
  .get(function (req, res, next) {
    schedule.findById(req.params.scheduleId, (err, schedule) => {
      if (err) throw err;

      res.json(schedule);
    });
  })

  .put(function (req, res, next) {
    schedule.findById(req.params.scheduleId, (err, schedule) => {
      if (err) throw err;
      schedule.remove();
      schedule.push(req.body);
      schedule.save((err, schedule) => {
        if (err) throw err;
        console.log("Schedule updated");
        res.json(schedule);
      });
    });
  })

  .delete(function (req, res, next) {
    schedule.findById(req.params.scheduleId, (err, schedule) => {
      schedule.remove(); //remove a single comment
      schedule.save((err, resp) => {
        if (err) throw err;
        res.json(resp);
      });
    });
  });

module.exports = scheduleRouter;
