//requiring packages
const express = require("express"),
app = express();

//setup
app.set("view engine","ejs");
app.use(express.static("public"));

//setting routes

//dashboard

app.get("/",function(req,res){
    res.render("quiz");
});




//server is running on port no-3000
app.listen(3000,function(){
  console.log("server is running...");
});