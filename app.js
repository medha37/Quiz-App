//requiring packages
const express   = require("express"),
      app       = express(),
      bodyParser = require("body-parser"),
     methodOverride = require('method-override'),
      mongoose  = require("mongoose");


//setup
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// database connection
 mongoose.connect("mongodb+srv://dbuser:dbpassword@cluster0.l4plx.mongodb.net/test?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
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
    // FIND all questions then 
    // render questions list

    Question.find({},function(err,questions){
        if(err)
          console.log(err);
        else{
            res.render("questions", { questions:questions});
        }
    });

    
});

//Add question form
app.get("/questions/new",function(req,res){
    // render add question form
    res.render("form");
});

//Add question to database
app.post("/questions",function(req,res){
  var newQ = {
    q: req.body.ques,
    options: [req.body.op1 , req.body.op2 , req.body.op3 , req.body.op4],
    answer: Number(req.body.ans)-1
};


  // CREATE question
  // if error redirect form again
  // else redirect to questions list

  Question.create(newQ,function(err,createdQ){
      if(err)
         res.redirect("/questions/new");
        else{
            res.redirect("/questions");
        }
  });

  
});

// render edit form for a question
app.get("/questions/:qid/edit", function(req, res) {
    // findById the question and
    // render edit question form
    // along with the question's data
    Question.findById(req.params.qid,function(err,question){
        if(err)
          res.redirect("/questions");
          else {
              res.render("editForm",{question: question});
          }
    });

});

// update question database
app.put("/questions/:qid", function(req, res) {
    // findByIdAndUpdate the question
    // after that redirect to qustions list
    var updatedQ = {
        q:       req.body.ques,
        options: [req.body.op1 , req.body.op2 , req.body.op3 , req.body.op4],
        answer:  Number(req.body.ans) - 1
    };
    Question.findByIdAndUpdate(req.params.qid , updatedQ , function(err , question){
        if(err)
         res.redirect("/questions/"+req.params.qid+"/edit");
         else{
            res.redirect("/questions");
         }
    });

});

//Delete a question
app.delete("/questions/:qid",function(req,res){
    // findByIdAndRemove the question
    // after that redirect to qustions list
    Question.findByIdAndRemove(req.params.qid,function(err,removedQ){
        if(err)
         res.redirect("/questions");
         else{
             res.redirect("/questions");
         }
    });
    
});



//server is running on port no-3000
app.listen(3000,function(){
  console.log("server is running...");
});