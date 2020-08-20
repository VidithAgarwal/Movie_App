var express    = require("express"),
	router     = express.Router(),
	Movie      = require("../models/movies"),
	User       = require("../models/users"),
	passport   = require("passport");

//Root Route
router.get("/", (req, res)=> {
	res.redirect("/movies");
})

//Show SignUp Form
router.get("/register", (req, res)=> {
	res.render("register");
})

// SignUp logic
router.post("/register", (req, res)=> {
	User.register(new User({username: req.body.username}), req.body.password)
		.then(()=>{
			passport.authenticate("local")(req, res, ()=>{
				res.redirect("/movies");
			})
		})
		.catch((err)=> {
			console.log(err);
			return res.render("register");
		})
})

//Show Login Form
router.get("/login", (req, res)=> {
	res.render("login");
})

//Login Logic
router.post("/login", passport.authenticate("local", {
	successRedirect: "/movies",
	failureRedirect: "/login"
}), (req, res)=>{
	
})

//Logout Logic
router.get("/logout", isLoggedIn, (req, res)=> {
	req.logout();
	res.redirect("/movies");
})

//Middleware
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;