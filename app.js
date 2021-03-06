var express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  expressSanitizer = require('express-sanitizer');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
mongoose.connect("mongodb://localhost/blogapp", function (err) {
  if (err) {
    console.log("Error connecting: " + err);
  }
});

var postSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});

var Post = mongoose.model("Post", postSchema);

app.get("/", function (req, res) {
  res.redirect("/posts");
});

//INDEX
app.get("/posts", function (req, res) {
  Post.find({}, function (err, posts) {
    if (err) {
      console.log(err);
    }
    else {
      res.render("index", {posts: posts});
    }
  });
});

//NEW
app.get("/posts/new", function (req, res) {
  res.render("new");
});

//CREATE
app.post("/posts", function (req, res) {
  req.body.post.body = req.sanitize(req.body.post.body);
  Post.create(req.body.post, function (err, post) {
    if (err) {
      console.log(err);
    }
    res.redirect("/posts");
  });
});

//SHOW
app.get("/posts/:id", function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    if (err) {
      res.redirect("/posts");
    }
    else {
      res.render("show", {post: post});
    }
  });
});

//EDIT
app.get("/posts/:id/edit", function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    if (err) {
      res.redirect("/posts");
    }
    else {
      res.render("edit", {post: post});
    }
  });
});

//UPDATE
app.put("/posts/:id", function (req, res) {
  req.body.post.body = req.sanitize(req.body.post.body);
  Post.findByIdAndUpdate(req.params.id, req.body.post, function (err, post) {
    if (err) {
      res.redirect("/posts");
    }
    else {
      res.redirect("/posts/" + req.params.id);
    }
  });
});

//DESTROY
app.delete("/posts/:id", function(req, res) {
  Post.findByIdAndDelete(req.params.id, function(err){
    if (err) {
      console.log(err);
      res.redirect("/posts");
    }
    else {
      res.redirect("/posts");
    }
  })
});

app.listen(3000, function () {
  console.log("serving on port 3000");
});
