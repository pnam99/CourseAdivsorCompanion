/*
Author: Phillip Nam, Vishal Nigam
*/

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = Schema({
  university_id: { type: Number, required: true },
  first_name: { type: String, max: 20 },
  last_name: { type: String, max: 20 },
  date_birth: { type: Date },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: ["Student", "Professor"], //Enum type
  isInstructor: { type: Boolean },
  advisees: [{ type: Schema.ObjectId, ref: "User" }], //Array of students
  schedule: { type: Schema.ObjectId, ref: "Schedule" }, //Student's schedule
  total_credit: { type: Number }, //Students
});

//an instance method added here to return fullname of the user
UserSchema.methods.getName = function () {
  return this.firstname + " " + this.lastname;
};
UserSchema.plugin(passportLocalMongoose);

//Export model
var users = mongoose.model("User", UserSchema);
module.exports = users;
