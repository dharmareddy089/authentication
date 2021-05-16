//jshint esversion:6
var express=require("express");
var app=express();
let ejs = require('ejs');
app.set('view engine', 'ejs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/userdb', {useNewUrlParser: true, useUnifiedTopology: true});
var userSchema=new mongoose.Schema({
  email:String,
  password:String
});
var User=mongoose.model("User",userSchema);
app.get("/",function(req,res){
  res.render("index");
});
app.get("/login",function(req,res){
  res.render("login");
});
app.get("/register",function(req,res){
  res.render("register");
});
app.post("/register",function(req,res){
  var user1=new User({
    email:req.body.username,
    password:req.body.password
  });
  user1.save(function(error){
    if(error){
      console.log(error);
    }else {
      res.render("secrets");
    }
  });
});
app.post("/login",function(req,res){
  var username=req.body.username;
  var password=req.body.password;
  User.findOne({email:username},function(error,found){
    if(error){
      console.log(error);
    }else {
      if(found){
        if(found.password===password){
          res.render("secrets");
        }
      }
    }
  });
});
app.listen(3000,function(){
  console.log("server started");
});
