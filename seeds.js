var mongoose 	= require("mongoose"),
	card 		= require("./models/cards"),
	Comment   	= require("./models/comments");

//Seeds won't work while logged in as show.ejs looks for 'card.author.id.equals(currentUser._id)' which is undefined in seeds DB.
 
var seeds = [
	{
        name: "To the distance", 
        image: "https://i.pinimg.com/564x/f4/83/b8/f483b8aa70a31e86dc00025c6d39eba2.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Flower floor", 
        image: "https://i.pinimg.com/564x/99/f0/ad/99f0ada7e142d3885d704db7bcc16ea0.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Ready for flight", 
        image: "https://i.pinimg.com/564x/81/31/61/813161b827f19e24577a7168e0fbf88c.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]
 
async function seedDB(){
	try {
		//remove all cards and comments
		await Comment.remove({});
		await card.remove({});
		console.log("cards and comments removed");

		//seed new cards and comments
		for(const seed of seeds) {
			let CardsCreation = await card.create(seed);
			console.log("cards created");

			let comment = await Comment.create(
				{
					text: "This is great",
					author: "Homer"
				}
			)
			console.log("comment created");

			//push new cards and comments
			CardsCreation.comments.push(comment);
			CardsCreation.save();
		}
	} catch(err) {
		console.log(err);
	}
}

async function removeAll(){
	try {
		//remove all campgrounds and comments
		await Comment.remove({});
		await card.remove({});
		console.log("cards and comments removed");

	} catch(err) {
		console.log(err);
	}
}

module.exports = {seedDB, removeAll}