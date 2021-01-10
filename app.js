//requiring packages
const express   = require("express"),
      app       = express(),
      mongoose  = require("mongoose");


//setup
app.set("view engine","ejs");
app.use(express.static("public"));

// database connection
// mongoose.connect("mongodb+srv://dbuser:dbpassword@cluster0.l4plx.mongodb.net/test?retryWrites=true&w=majority",
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true 
//     })
//     .then(function(){console.log("MongoDB Connected...")})
//     .catch(function(err){console.log(err)});

// // Schema definition
// let questionSchema = new mongoose.Schema({
//   q: String,
//   options: [String],
//   answer: Number
// });
// // Compile into model
// let Question = mongoose.model("Question", questionSchema);
const quiz = [
  {
      q:'Which is the part of the computer system that one can physically touch?',
      options: ['data' , 'operating systems ' , 'hardware' , 'software'],
      answer: 2
  },
  {
      q:'A ………. is an electronic device that process data, converting it into information.',
      options:['computer ' , 'processor' , 'case' , 'stylus'],
      answer: 0
  },
  {
      q:'IC chips used in computers are usually made of:',
      options: ['Lead ' , 'Silicon' , 'Chromium' , 'Gold'],
      answer: 1
  },
  {
      q:'Which of the following is not an example of an Operating System?',
      options: ['Windows 98 ' , 'BSD Unix' , 'Microsoft Office XP' , 'Red Hat Linux'],
      answer: 2
  },
  {
      q:'Which of the following is not an input device?',
      options: ['Mouse ' , 'Light pen' , 'Keyboard' , ' VDU'],
      answer: 3
  },
  {
      q:'One Gigabyte is approximately equal is:',
      options: ['1000,000 bytes' , '1000,000,000 bytes' , '1000,000,000,000 bytes' , ' None of these'],
      answer: 1
  },
  {
      q:' Compact discs, (according to the original CD specifications) hold how many minutes of music?',
      options: [' 74 mins' , '90 mins' , '56 mins' , '60 mins'],
      answer: 0
  },
  {
      q:' What type of process creates a smaller file that is faster to transfer over the internet?',
      options: ['Compression' , 'Fragmentation' , 'Encapsulation' , ' None of the above'],
      answer: 0
  },
  {
      q:'Which of the following is used to Manage DataBase?',
      options: ['Operating System' , 'Compiler' , 'DBMS' , ' None of the above'],
      answer: 2
  }, 
  {
      q:' Which of the following is an example of non-volatile memory?',
      options: ['Cache memory' , ' RAM' , 'ROM' , ' None of the above'],
      answer: 2
  }                                
]


//setting routes

//dashboard
app.get("/",function(req,res){
    res.render("quiz");
});

//List of questions
app.get("/questions",function(req,res){
  res.render("questions",{questions:quiz});
});

//Add question form
app.get("/questions/new",function(req,res){
    res.render("form");
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