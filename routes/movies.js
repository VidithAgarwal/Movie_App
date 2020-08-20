var express    = require("express"),
	router     = express.Router(),
	Movie      = require("../models/movies");

// Index - Shows all movies
router.get("/", (req, res)=> {
	Movie.find({})
		.then((movies)=> {
			res.render("index", {movies: movies});
		})
		.catch((error)=> {
			console.log(error.message);
		})
})

// New - Add new movie form
router.get("/new", isLoggedIn, (req, res)=> {
	res.render("new");
})

// Create - Creates a new movie
router.post("/",isLoggedIn, (req, res)=> {
	req.body.movie.author = {
		id: req.user._id,
		username: req.user.username
	} 
	Movie.create(req.body.movie)
		.then(()=> {
			res.redirect("/movies");
		})
		.catch((error) => {
			res.redirect("/");
			console.log(error.message);
		})
})

// Show - shows information about a selected movie
router.get("/:id",isLoggedIn, (req, res)=> {
	Movie.findById(req.params.id).populate("comments").exec()
		.then((foundMovie) => {
			res.render("show", {movie: foundMovie});
		})
		.catch((error) => {
			console.log(error.message);
			res.redirect("/movies");
	})
})

// Edit - Shows an edit form
router.get("/:id/edit",isLoggedIn, (req, res)=> {
	Movie.findById(req.params.id)
		.then((foundMovie) => {
			res.render("edit", {movie: foundMovie});
		})
		.catch((error) => {
			console.log(error.message);
			res.redirect("/movies");
	})
})

// Update - Updates information about a movie
router.put("/:id",isLoggedIn, (req, res)=> {
	Movie.findByIdAndUpdate(req.params.id, req.body.movie)
		.then((updatedMovie) => {
			res.redirect("/movies/" + req.params.id);
		})
		.catch((error) => {
			console.log(error.message);
			res.redirect("/movies");
	})
})

// Delete - Delete Logic
router.delete("/:id",isLoggedIn, (req,res) =>{
	Movie.findByIdAndRemove(req.params.id)
		.then(() =>{
			res.redirect("/movies");
		})
})

//Middleware
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;