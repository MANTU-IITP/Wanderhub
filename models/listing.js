const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review=require("./review.js");



const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  price: Number,
  location: String,
  country: String,
  image: {
    url: String,
    filename: String,
},
owner: {
    type: Schema.Types.ObjectId,
    ref: "User", // This should match the User model
},
reviews: [
    {
        type: Schema.Types.ObjectId,
        ref: "Review",
    },
],

});


module.exports = mongoose.model("Listing", listingSchema);
