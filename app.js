//requiring packages
const express   = require("express"),
      app       = express(),
      mongoose  = require("mongoose");


//setup
app.set("view engine","ejs");
app.use(express.static("public"));

// database connection
mongoose.connect("mongodb+srv://dbuser:dbpassword@cluster0.l4plx.mongodb.net/test?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    })
    .then(function(){console.log("MongoDB Connected...")})
    .catch(function(err){console.log(err)});

// Schema definition
let questionSchema = new mongoose.Schema({
  q: String,
  options: [String],
  answer: Number
});
// Compile into model
let Question = mongoose.model("Question", questionSchema);



//setting routes

//dashboard
app.get("/",function(req,res){
    res.render("quiz");
});

//List of questions
app.get("/questions",function(req,res){

});

//Add question form
app.get("/questions/new",function(req,res){

});

//Add question to database
app.post("/questions",function(req,res){

});

//Delete a question
app.delete("/questions/:qid",function(req,res){

});



//server is running on port no-3000
app.listen(3000,function(){
  console.log("server is running...");
});