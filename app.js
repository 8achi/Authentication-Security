const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const md5 = require("md5");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});



const User = new mongoose.model( "User", userSchema);

app.get("/",function(req,res){
  res.render("home");
});
app.get("/login",function(req,res){
  res.render("login");
});
app.get("/register",function(req,res){
  res.render("register");
});


app.post("/register",function(req,res){
  const newUser = new User({
    email: req.body.userName,
    password: md5(req.body.password),
  });

  newUser.save(function(err){
    if(err){
      console.log(err);
    }else{
      res.render("secrets");

    }
  });

});


app.post("/login",function(req,res){
  const userName = req.body.userName;
  const password = md5(req.body.password);
  User.findOne({email: userName}, function(err, user){
    if(err){
      console.log(err);
    }else{
      const check = user.password;
      if(check == password){
        res.render("secrets");
      }
    }

  })



})









app.listen(3000, function(req,res){
  console.log("listening on port 3000");
});
