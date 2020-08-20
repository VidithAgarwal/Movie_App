var mongoose = require("mongoose");

var movieSchema = new mongoose.Schema({
	duration : Number,
	poster   : String,
	genre    : String,
	title    : String,
	desc     : String,
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref : "Comment"
	}],
	author: 
	{
		id: 
		{
			type: mongoose.Schema.Types.ObjectId,
			ref:  "User"
		},
		username: String
	}
})

module.exports = mongoose.model("Movie", movieSchema);