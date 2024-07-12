const mongoose = require("mongoose");


require('dotenv').config();

const URI = process.env.MONGODB_URI;


const connectDb = async () => {
    try {
        if (!URI) {
            throw new Error("MongoDB URI is not defined. Please set the MONGODB_URI environment variable.");
        }
        
        await mongoose.connect(URI);

        console.log("Database connection successful");
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);
    }
};

module.exports = connectDb;
