const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    productName: String,
    category: String,
    productImg: String,
    price: Number,
    productDetails: String,
    numOfProduct: Number
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;