/*
Author: Phillip Nam, Vishal Nigam
*/

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

require("mongoose-currency").loadType(mongoose);
var Currency = mongoose.Types.Currency;

var CourseSchema = Schema({
  course_id: { type: String, required: true, max: 7 },
  course_name: { type: String, required: true, max: 50 },
  instructor: { type: String, ref: "User" },
  students: [{ type: Schema.ObjectId, ref: "User" }],
  semester: { type: String },
  credit: { type: Number },
});

//Export model
var courses = mongoose.model("Course", CourseSchema);
module.exports = courses;
