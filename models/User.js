const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: String,
    username: String,
    password: String,
    DOB: String,
    country: String,
    favorites: [String],
    cart: [{
        productID: String,
        quantity: Number,
    }],
});

const User = mongoose.model("User", UserSchema);
module.exports = User;