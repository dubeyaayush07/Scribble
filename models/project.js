var mongoose =  require("mongoose");
var projectSchema = new mongoose.Schema({
   title: String,
   details:String,
   difficulty:Number,
   votes:Number
});

module.exports = mongoose.model("Project", projectSchema );