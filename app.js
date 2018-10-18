var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
//aurentykacja i logowanine
var passport = require("passport");
var LocalStrategy = require("passport-local");
// modele mongoose do bazy danych
Photo = require("./models/photo")
User = require("./models/user")

// konnfiguracja passport passport-local
app.use(require("express-session")({
	secret: "Dawnno dawno temu w odległej galaktyce",
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// MongoDB połączenie
mongoose.connect("mongodb://localhost/Album",  { useNewUrlParser: true });

// konfiguracja apki
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static('public'));

//routes
app.get("/", function(req, res){
	res.render("landing")
});

app.get("/photos", function(req, res){

	 Photo.find({}, function (err, allPhotos){
	   if(err){console.log(err);
	   } else{
	   		 res.render("photos", {photos:allPhotos})
			 }
     });
});


app.get("/photos/new", function(req, res){
	res.render("new");
});

app.post("/photos", function(req, res){
	var name = req.body.name
	var image = req.body.image
	var newPhoto = {name:name, image:image}
	
    Photo.create(newPhoto, function(err, newPhoto){
    	if(err){console.log(err)
    	} else {res.redirect("/photos")}
    })	
});

  app.get("/photos/:id", function(req, res){
  var id = req.params.id;
  Photo.findOne({_id:id}, function (err, found){
	   if(err){res.send(err);
	   } else{
	   		 // res.send(found);
	   		 res.render("show",{photo:found})
			 }
     });
  });

 

// auth routes
app.get("/register", function(req, res){
	res.render("register");
});

app.get("/login", function(req, res){
	res.render("login");
});




//nasłuch serwera
app.listen(8080, function(){console.log("Server started")});