var express = require("express"),
    app= express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");
    
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/blog");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "testing the blog",
//     image: "https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ed17683f2c514eed2ab025ff59b1e3b8&auto=format&fit=crop&w=400&q=60",
//     body: "this is just a test post."
// });

app.get("/", function(req, res){
    res.redirect("/blogs");
    
});

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blog){
        if(err){
            res.render("error");
        }else{
            res.render("index", {blog: blog});
        }
    });
    res.render("index");
    
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The blog is now up and runing share your content"); 
});