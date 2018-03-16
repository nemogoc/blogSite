var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost/blogapp");

var postSchema = new mongoose.Schema({
  title: String,
  img: String,
  body: String
});

var Post = mongoose.model("Post", postSchema);