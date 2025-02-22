const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderhub";

async function main() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to DB");
    } catch (err) {
        console.error("Error connecting to DB:", err);
    }
}
main();

const initDB = async () => {
    await Listing.deleteMany({});
    
    // ✅ FIX: Modify `initData.data` instead of reassigning `initData`
    const updatedData = initData.data.map((obj) => ({ ...obj, owner: "67b2fba45e1eb0984782aa80" }));
    
    await Listing.insertMany(updatedData);
    console.log("Data was initialized");
};

initDB();



