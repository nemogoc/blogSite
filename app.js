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

//INDEX
app.get("/posts", function(req, res){
  Post.find({}, function(err, posts){
    if(err){
      console.log(err);
    }
    else{
      res.render("index", { posts: posts });
    }
  });
});

//NEW
app.get("/posts/new", function(req,res){
  res.render("new");
});

//CREATE
app.post("/posts", function(req, res){
  var createdDate;
  var newPost = {
    title: req.body.title,
    image: req.body.image,
    body: req.body.body
  };
  if (createdDate){
    newPost.created = createdDate;
  }

  Post.create(newPost, function(err, post){
    if (err){
      console.log(err);
    }
    res.redirect("/posts");
  });
});

app.listen(3000, function(){
  console.log("serving on port 3000");
});
