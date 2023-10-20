// mongoDB database connection with mongoose
const mongoose = require("mongoose");



// create schemas for product 
const productSchema = mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    stock: {
        type: Number,
        required: true
    }
});

// create Collection in mongoDB 
exports.Product = mongoose.model('product', productSchema);