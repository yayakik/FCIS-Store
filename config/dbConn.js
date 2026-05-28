const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_ACCESS);
        console.log("Connected successfully to MongoDB");
    } catch (err) {
        console.log("ERROR CONNECTING TO MONGODB", err);
    }
}

module.exports = connectDB;