var mongoose = require("mongoose"),
	comment  = require("./comment");

var cardSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   price: Number,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

cardSchema.pre('remove', async function(next) {
	if(err){
		res.redirect("back");
	} else {
		await Comment.remove ({
			"_id": {
			$in: this.comments
			}
		});
	});

module.exports = mongoose.model("card", cardSchema);