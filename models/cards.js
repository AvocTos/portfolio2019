var mongoose = require("mongoose");

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
	try {
		await Comment.remove({
			"_id": {
				$in: this.comments
			}
		});
		next();
  	} catch(err) {
		next(err);
	}
});

module.exports = mongoose.model("card", cardSchema);