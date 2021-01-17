//requiring packages
const express   = require("express"),
      app       = express(),
      bodyParser = require("body-parser"),
      methodOverride = require('method-override'),
      expressSanitizer = require("express-sanitizer"),
      mongoose  = require("mongoose");


//setup
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

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
    // find all questions 
    // then render dashboard
    Question.find({}, function(err, questions) {
        if(err) {
            console.log(err);
        } else {
            res.render("quiz", {questions: questions});
        }
    });
    
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

    // sanitize text inputs to remove script tags if any
    var q = req.sanitize(req.body.ques);
    var op1 = req.sanitize(req.body.op1);
    var op2 = req.sanitize(req.body.op2);
    var op3 = req.sanitize(req.body.op3);
    var op4 = req.sanitize(req.body.op4);

    // check question input
    // it must be non null & max length 150
    var ques_check = false;
    if(q !== "" && q !== undefined) {
        ques_check = true;
    }
    if(ques_check)
        q = q.substring(0, Math.min(150, q.length));

    // check for options
    var options_check = false;
    if(op1 !== "" && op1 !== undefined &&
        op2 !== "" && op2 !== undefined &&
        op3 !== "" && op3 !== undefined &&
        op4 !== "" && op4 !== undefined
    ) {
        options_check = true;
    }

    if(options_check) {
        op1 = op1.substring(0, Math.min(50, op1.length));
        op2 = op2.substring(0, Math.min(50, op2.length));
        op3 = op3.substring(0, Math.min(50, op3.length));
        op4 = op4.substring(0, Math.min(50, op4.length));
    }

    // check answer constraints
    var ans = Number(req.body.ans);
    var ans_check = false;
    if(ans >= 1 && ans <= 4) {
        ans_check = true;
    }

    if(ques_check && options_check && ans_check) {
        var newQ = {
            q: q,
            options: [op1 , op2 , op3 , op4],
            answer: ans-1
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
    } else res.redirect("/questions/new");
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
    //senitize all text inputs
    var q = req.sanitize(req.body.ques);
    var op1 = req.sanitize(req.body.op1);
    var op2 = req.sanitize(req.body.op2);
    var op3 = req.sanitize(req.body.op3);
    var op4 = req.sanitize(req.body.op4);
    // check question input
    // it must be non null & max length 150
    var ques_check = false;
    if(q !== "" && q !== undefined) {
        ques_check = true;
    }
    if(ques_check)
        q = q.substring(0, Math.min(150, q.length));

    // check for options
    var options_check = false;
    if(op1 !== "" && op1 !== undefined &&
        op2 !== "" && op2 !== undefined &&
        op3 !== "" && op3 !== undefined &&
        op4 !== "" && op4 !== undefined
    ) {
        options_check = true;
    }

    if(options_check) {
        op1 = op1.substring(0, Math.min(50, op1.length));
        op2 = op2.substring(0, Math.min(50, op2.length));
        op3 = op3.substring(0, Math.min(50, op3.length));
        op4 = op4.substring(0, Math.min(50, op4.length));
    }

    // check answer constraints
    var ans = Number(req.body.ans);
    var ans_check = false;
    if(ans >= 1 && ans <= 4) {
        ans_check = true;
    }
    //if all input checks are correct then 
    // findByIdAndUpdate the question
    // after that redirect to qustions list
    if(ques_check && options_check && ans_check) {
        var updatedQ = {
            q: q,
            options: [op1 , op2 , op3 , op4],
            answer: ans-1
        };    

        Question.findByIdAndUpdate(req.params.qid , updatedQ , function(err , question){
            if(err)
            res.redirect("/questions/"+req.params.qid+"/edit");
            else{
                res.redirect("/questions");
            }
        });
    } else{
        res.redirect("/questions/"+req.params.qid+"/edit");
    }

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