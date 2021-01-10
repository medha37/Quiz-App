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




//server is running on port no-3000
app.listen(3000,function(){
  console.log("server is running...");
});