var express 	= require("express");
var router  	= express.Router();
var Cards 		= require("../models/cards");
var Comment 	= require("../models/comments");
var middleware 	= require("../middleware");
var request 	= require("request");

//INDEX - show all cards
router.get("/", function(req, res){
    // Get all cards from DB
    Cards.find({}, function(err, allCards){
       if(err){
           console.log(err);
       } else {
            request('https://maps.googleapis.com/maps/api/geocode/json?address=sardine%20lake%20ca&key=AIzaSyBtHyZ049G_pjzIXDKsJJB5zMohfN67llM', function (error, response, body) {	
            if (!error && response.statusCode == 200) {	
                console.log(body); // Show the HTML for the Modulus homepage.	
                res.render("gallery/index",{card: allCards});	
            }	
		});	
       }	
    });	
});	

//CREATE - add new card to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var name 	= req.body.name,
        image 	= req.body.image,
        description = req.body.description,
	    price 	= req.body.price,
        author 	= {
        		  id: req.user._id,
        		  username: req.user.username
            };
	
    var newCard = {name: name, 
				   image: image, 
				   description: description, 
				   price: price, 
				   author: author};

    // Create a new card and save to DB
    Cards.create(newCard, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/gallery");
        }
    });
});


//NEW - show form to create new card
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("gallery/new"); 
});


// SHOW - shows more info about one card
router.get("/:id", function(req, res){
    //find the card with provided ID
    Cards.findById(req.params.id).populate("comments").exec(function(err, foundCard){
        if(err){
            console.log(err);
        } else {
            console.log(foundCard)
            //render show template with that card
            res.render("gallery/show", {card: foundCard});
        }
    });
});


//show edit page
router.get("/:id/edit", middleware.checkUserCard, function(req, res){
    console.log("Card in edit");
    //find the card with provided ID
    Cards.findById(req.params.id, function(err, foundCards){
        if(err){
            console.log(err);
        } else {
            //render show template with that card
            res.render("gallery/edit", {card: foundCards});
        }
    });
});

router.put("/:id", function(req, res){
    var newData = {name: req.body.name, 
				   image: req.body.image, 
				   description: req.body.description, 
				   price: req.body.price};
	
    Cards.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, card){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/gallery/" + card._id);
        }
    });
});

router.delete("/:id", middleware.checkUserCard, function(req,res, next){
		Cards.findById(req.params.id, function(err, card){
			if(err) return next(err);
			
			card.remove();
			req.flash('success', 'Card deleted Successfully');
			res.redirect("/gallery");
	});
});

module.exports = router;