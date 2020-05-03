/*
Author: Phillip Nam, Vishal Nigam
*/

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

require("mongoose-currency").loadType(mongoose);
var Currency = mongoose.Types.Currency;

var ScheduleSchema = Schema({
  course: [{ type: Schema.ObjectId, ref: "Course", required: true }],
  reg_credit: { type: Number },
  schedule_semester: { type: String },
});

//Export model
module.exports = mongoose.model("Schedule", ScheduleSchema);
