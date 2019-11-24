var express     	= require("express"),
	app         	= express(),
    mongoose    	= require("mongoose"),
	mongodb 		= require('mongodb'),
    passport    	= require("passport"),
	bodyParser  	= require("body-parser"),
    cookieParser 	= require("cookie-parser"),
    flash        	= require("connect-flash"),
	LocalStrategy 	= require("passport-local"),
	methodOverride 	= require("method-override"),
	session 		= require("express-session"),
	dotenv			= require("dotenv").config(),
	seeds      		= require("./seeds"),
	User        	= require("./models/user"),
  	Comment     	= require("./models/comments"),
	Card		  	= require("./models/cards");

//requiring routes
var commentRoutes    = require("./routes/comments"),
    navigationRoutes = require("./routes/navigation"),
	galleryRoutes 	 = require("./routes/gallery"),
    indexRoutes      = require("./routes/index");

// see MONGOLAB_URL in .env file
var url = "mongodb://'potato123':'potato123'@ds063833.mlab.com:63833/heroku_6lk1f10g";

// Use connect method to connect to the Server
mongoose.connect(url, {
    useUnifiedTopology: true,
	useNewUrlParser: true
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(require("express-session")({
    secret: "We work until the work is done",
    resave: false,
    saveUninitialized: false,
	useUnifiedTopology: true,
	useNewUrlParser: true
}));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(cookieParser('secret'));

//seeds.seedDB(); //seed the database (removes whole library and adds seeds)
//seeds.removeAll(); //removes whole library


app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.success = req.flash('success');
   res.locals.error = req.flash('error');
   next();
});


app.use("/", indexRoutes);
app.use("/gallery", galleryRoutes);
app.use("/gallery/:id/comments", commentRoutes);
app.use("/navigation", navigationRoutes);


var listener = app.listen(9000, function(){
    console.log('Listening on port ' + listener.address().port); //Listening on port 9000
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Site is Alive!");
});