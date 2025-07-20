const Listing = require("../models/listing");
const Review = require("../models/reviews.js");
const mongoose = require("mongoose");

module.exports.createReview = async(req , res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.Review);
    console.log(newReview);
    newReview.author = req.user._id;
 
    listing.reviews.push(newReview._id);
 
     await newReview.save();
     await listing.save();
     req.flash("success" , "New Review Created!");
 
     res.redirect(`/listings/${listing._id}`);
};

module.exports.deleteReview = async(req , res)=>{
  let{id , reviewId} = req.params;
  await Listing.findByIdAndUpdate(id , {$pull : {reviews : new mongoose.Types.ObjectId(reviewId.trim())}});
  await Review.findByIdAndDelete(reviewId);
  req.flash("success" , "Review Deleted!");

  res.redirect(`/listings/${id}`);
};
