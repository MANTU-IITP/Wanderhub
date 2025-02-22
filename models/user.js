const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passportLocalMongoose=require("passport-local-mongoose");


const userSchema=new Schema({
    email:{
        type:String,
        required:true
    },//ham user ko defined nhi karenge vo passport hi kr dega
});

userSchema.plugin(passportLocalMongoose);//ye salt ye sab add kar dega
module.exports=mongoose.model("User",userSchema);