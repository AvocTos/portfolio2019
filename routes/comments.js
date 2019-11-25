var express 	= require("express");
var router  	= express.Router({mergeParams: true});
var Card 		= require("../models/cards");
var Comment     = require("../models/comments");
var middleware 	= require("../middleware");

//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
    // find card by id
    console.log(req.params.id);
    Card.findById(req.params.id, function(err, card){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {card: card});
        }
    })
});

//Comments Create
router.post("/",middleware.isLoggedIn,function(req, res){
   //lookup card using ID
   Card.findById(req.params.id, function(err, card){
       if(err){
           console.log(err);
           res.redirect("/gallery");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //save comment
               comment.save();
               card.comments.push(comment);
               card.save();
               console.log(comment);
               req.flash('success', 'Created a comment!');
               res.redirect('/gallery/' + card._id);
           }
        });
       }
   });
});

//edit comment
router.get("/:commentId/edit", middleware.isLoggedIn, function(req, res){
    // find campground by id
    Comment.findById(req.params.commentId, function(err, comment){
        if(err){
            console.log(err);
        } else {
             res.render("comments/edit", {card_id: req.params.id, comment: comment});
        }
    })
});

router.put("/:commentId", function(req, res){
   Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, function(err, comment){
       if(err){
           res.render("edit");
       } else {
           res.redirect("/gallery/" + req.params.id);
       }
   }); 
});

router.delete("/:commentId",middleware.checkUserComment, function(req, res){
    Comment.findByIdAndRemove(req.params.commentId, function(err){
        if(err){
            console.log("unable to delete comment! error");
        } else {
            res.redirect("/gallery/" + req.params.id);
        }
    })
});

module.exports = router;