const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsyc.js");


const Listing=require("../models/listing.js");
const  {isLoggedIn, isOwner,validateListing}=require("../middleware.js");

const listingController=require("../controllers/listings.js");
const multer=require('multer');
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});


// const { link } = require("joi");

//ham route .route se sare commomn route ko ek jaga kar denge
router
 .route("/")
 .get(wrapAsync(listingController.index))
 .post(
    
    isLoggedIn,
    
    upload.single('listing[image]'),
    validateListing,
     wrapAsync (listingController.createListing)
   

 );


//new route hame ye id ke pehle likna hoga kyunki id pe baad me jayenge
router.get("/new",isLoggedIn,listingController.renderNewForm);
    
 router.route("/:id")
 .get( wrapAsync(listingController.showListing))
 .put(
    
    isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.updateListing)
 )
 .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));




// //index.route esi ko hamne route.route me lik diya h ab yahan se delete bhi kar saktte h
// router.get("/", wrapAsync(listingController.index))


//edit route
router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,

    wrapAsync(listingController.renderEditForm)
);








module.exports=router;