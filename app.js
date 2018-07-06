var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride =  require("method-override");
var Project = require("./models/project");

var isNew = true;

mongoose.connect("mongodb://localhost/scribble");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));


//landing route
app.get("/", function(req, res){
   res.redirect("/projects"); 
});


//index route
app.get("/projects", function(req,res){
    Project.find({}, function(err, allProjects){
       if(err)console.log(err);
       else{
           if(isNew){
               allProjects.reverse();
               res.render("index", {projects: allProjects}); 
           }
           else{
               let arr = allProjects.sort(function(a,b){
                    return b.votes-a.votes;
                 });
               res.render("index", {projects: arr});
            }
       }
    });
   
});

//new route
app.get("/projects/new", function(req, res) {
   res.render("new"); 
});


//create route
app.post("/projects", function(req, res){
    req.body.project.votes = 0;
    Project.create(req.body.project, function(err, newProject){
        if(err)console.log(err);
        else{
            res.redirect("/projects");
        }
    });
});


//show 
app.get("/projects/:id", function(req, res) {
   Project.findById(req.params.id, function(err, project) {
       if(err){
           console.log(err);
       }
       else{
           res.render("show", {project:project});
       }
   });
});

//edit
app.get("/projects/:id/edit", function(req, res) {
   Project.findById(req.params.id, function(err, project) {
       if(err)console.log(err);
       else{
           res.render("edit",{project:project});
       }
   });
});

//update
app.put("/projects/:id", function(req, res) {
   Project.findByIdAndUpdate(req.params.id, req.body.project, function(err){
     if(err)console.log(err);
     else{
        res.redirect("/projects");   
     }
   });
});

//delete
app.delete("/projects/:id", function(req,res){
   Project.findByIdAndRemove(req.params.id, function(err){
       if(err)console.log(err);
       else{
           res.redirect("/projects");
       }
   });
});

//vote-up
app.put('/projects/:id/vote-up', function (req, res) {
  Project.findById(req.params.id, function (err, project) {
    if(err)console.log(err);
    else{
        project.votes = project.votes + 1;    
        project.save();
        res.send(String(project.votes));
    }
  });
});

//vote-down
app.put('/projects/:id/vote-down', function (req, res) {
  Project.findById(req.params.id, function (err, project) {
    if(err)console.log(err);
    else{
        project.votes = project.votes - 1;    
        project.save();
        res.send(String(project.votes));
    }
  });
});

//sort
app.get("/projects/sort/:type", function(req, res) {
   if(req.params.type == 'recent'){
       isNew =true;
   }
   else if(req.params.type == 'pop'){
       isNew =  false;
   }
   
   res.redirect("/projects");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Application is running");
});


