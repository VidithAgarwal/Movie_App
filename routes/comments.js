var express    = require("express"),
	router     = express.Router({mergeParams: true}),
	Movie      = require("../models/movies"),
	Comment    = require("../models/comments");

//Show Comment Form
router.get("/new", (req, res)=> {
	Movie.findById(req.params.id)
		.then((movie)=>{
			res.render("newComment", {movie: movie});
		})
		.catch((err) => {
			console,log(err);
		})
})

// Create Comment 
router.post("/", (req, res)=> {
	Movie.findById(req.params.id)
		.then((movie)=> {
			Comment.create(req.body.comment)
				.then((comment)=> {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					movie.comments.push(comment);
					movie.save();
					res.redirect("/movies/" + movie._id);
				})
				.catch((err)=> {
					console.log(err);
				})
		})
		.catch((err) => {
			console,log(err);
			res.redirect("/movies")
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