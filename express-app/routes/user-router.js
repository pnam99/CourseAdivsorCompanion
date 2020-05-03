var express = require("express");
var usersRouter = express.Router();
/** 1- declare mongoose and users **/
const mongoose = require("mongoose");
let users = require("../models/user");

var Verify = require("./verify");

usersRouter
  .route("/")
  .get(Verify.verifyOrdinaryUser, function (req, res, next) {
    //chained into route(), no semi-colon after the all implementation
    // 2- implement get  to return all users
    users.find({}, (err, users) => {
      //get the users collection as an array,received as the user param
      if (err) throw err; //propagate error
      // convert to json and return in res
      res.json(users);
    });
  })

  .post(Verify.verifyOrdinaryUser, function (req, res, next) {
    // 3- implement post request to insert user into database
    users.create(req.body, (err, user) => {
      if (err) throw err; //propagate error

      console.log("user created");
      var id = user._id;
      res.writeHead(200, { "Content-Type": "text-plain" }); //send reply back to the client with user id
      res.end("Added the user with id: " + id);
    });
  })

  .delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    // 4- delete deletes all users in the collection
    users.remove({}, (err, resp) => {
      if (err) throw err; //propagate error

      res.json(resp);
    });
  });

usersRouter
  .route("/:userId") // a second router is define using parameters.

  .get(Verify.verifyOrdinaryUser, function (req, res, next) {
    // 4- find by id
    users.findById(req.params.userId, (err, user) => {
      //get the users collection as an array,received as the user param
      if (err) throw err; //propagate error
      res.json(user); // convert to Json and return in res
    });
  })

  .put(Verify.verifyOrdinaryUser, function (req, res, next) {
    // 5- implement post request to update a specific user
    console.log("Put operation trigger");
    //users.findByIdAndUpdate();
    //console.log("Put operation completed");
    users.findByIdAndUpdate(
      req.params.userId,
      {
        $set: req.body, //assuming body contains the update
      },
      {
        new: true,
      },
      function (err, user) {
        if (err) throw err; //propagate error
        res.json(user);
      }
    );
    /*
    Recipes.findByIdAndUpdate(req.params.recipeId, {
		      $set:req.body   //assuming body contains the update
		   },{
			   new: true
		   }, function (err, recipe){
				if (err) throw err; //propagate error
				res.json(recipe);
		   
	})
    */
  })

  .delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    // 6- delete specific user in the collection
    users.findByIdAndRemove(req.params.userId, (err, resp) => {
      if (err) throw err;
      res.json(resp);
    });
  });

usersRouter
  .route("/:userId/courses")
  .all(Verify.verifyOrdinaryUser)
  .get(function (req, res, next) {
    users.findById(req.params.userId, (err, user) => {
      if (err) throw err;

      res.json(user.schedule);
    });
  });

usersRouter
  .route("/:userId/advisees")
  .all(Verify.verifyOrdinaryUser)
  .get(function (req, res, next) {
    users.findById(req.params.userId, (err, user) => {
      if (err) throw err;

      res.json(user.advisees);
    });
  });
usersRouter
  .route("/:userId/advisees/:adviseeId")
  .all(Verify.verifyOrdinaryUser)
  .get(function (req, res, next) {
    users.findById(req.params.userId, (err, user) => {
      if (err) throw err;

      res.json(user.advisees.id(req.params.adviseeId));
    });
  })

  .put(Verify.verifyOrdinaryUser, function (req, res, next) {
    users.findById(req.params.userId, (err, user) => {
      if (err) throw err;
      user.advisees.id(req.params.adviseeId).remove();
      user.advisees.id(req.params.adviseeId).push(req.body);
      user.save((err, user) => {
        if (err) throw err;
        console.log("Advisees updated");
        res.json(user);
      });
    });
  })

  .delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    users.findById(req.params.userId, (err, user) => {
      user.advisees.id(req.params.adviseeId).remove(); //remove a single comment
      user.save((err, resp) => {
        if (err) throw err;
        res.json(resp);
      });
    });
  });

module.exports = usersRouter;
