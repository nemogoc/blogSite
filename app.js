var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost/blogapp", function(err){
  if(err){
    console.log("Error connecting: " + err);
  }
});

var postSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now }
});

var Post = mongoose.model("Post", postSchema);


app.listen(3000, function(){
  console.log("serving on port 3000");
});
