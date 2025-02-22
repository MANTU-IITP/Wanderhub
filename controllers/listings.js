const mongoose = require("mongoose");
const { listingSchema } = require("../schema.js"); // Adjust the path if necessary
const ExpressError = require("../utils/ExpressError"); // Ensure ExpressError is imported if used


const Listing=require("../models/listing");




module.exports.index=async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
};

module.exports.renderNewForm=(req,res)=>{
    
    res.render("listings/new.ejs")
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    
    const listing = await Listing.findById(id)
        .populate("owner")  // Ensure owner is populated
        .populate({
            path: "reviews",
            populate: { path: "author" },
        });

    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }

    console.log("Listing Image URL:", listing.image?.url); 
    console.log("Listing Owner:", listing.owner);

    res.render("listings/show.ejs", { listing });
};




module.exports.createListing = async (req, res, next) => {
    console.log("Current User ID:", req.user ? req.user._id : "No User");  // Debugging

    let url =  req.file.path ;
    let filename =  req.file.filename ;

    const newListing = new Listing(req.body.listing);
    
    if (req.user) {
        newListing.owner = req.user._id;  // Ensure owner is assigned
    } else {
        console.log("Error: User not found!");
    }

    newListing.image = { url, filename };

    await newListing.save();
    req.flash("success", "New listing created");
    res.redirect("/listings");
};




module.exports.renderEditForm=async(req,res)=>{
    // console.log("Request params:", req.params); // Debugging line
    let{ id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist");
        return res.redirect("/listings");
    }

    let originalImageurl=listing.image.url;
    originalImageurl=originalImageurl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs",{listing,originalImageurl});
};
module.exports.updateListing=async(req,res)=>{
    
   let {id}= req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
    
    if(typeof req.file !="undefined"){
         
    let url =  req.file.path ;
    let filename =  req.file.filename ;
    listing.image={url,filename};
    await listing.save();

    }
   
    req.flash("success","Listing Updated");
    res.redirect(`/listings/${id}`);

};

module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
    let deleteListing=await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash("success","listing deleted");
    res.redirect("/listings");
};
