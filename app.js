var methodOverride        = require("method-override"),
	bodyParser 	          = require("body-parser"),
	mongoose              = require("mongoose"),
	express               = require("express"),
	Movie                 = require("./models/movies"),
	User                  = require("./models/users"),
	Comment               = require("./models/comments"),
	passport              = require("passport"),
	LocalStratergy        = require("passport-local"),
	app                   = express();

// Requiring Routes
var movieRoutes           = require("./routes/movies"),
	commentRoutes         = require("./routes/comments"),
	indexRoutes           = require("./routes/index");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Virat Panauti",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	return next();
})
passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Use movie routes
app.use("/movies", movieRoutes);
app.use("/movies/:id/comments", commentRoutes);
app.use("/", indexRoutes);

mongoose.connect("mongodb://localhost:27017/movie_app", {
	useUnifiedTopology: true,
	useNewUrlParser: true
})
	.then(()=> {
		console.log("THE DATABASE HAS BEEN CONNECTED");
	})
	.catch((error)=> {
		console.log(error.message);
	})

var port = process.env.PORT || 3000;
app.listen(port, ()=> {
	console.log("THE SERVER HAS STARTED");
})

