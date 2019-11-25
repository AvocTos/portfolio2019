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


module.exports = mongoose.model("card", cardSchema);