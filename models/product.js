// mongoDB database connection with mongoose
const mongoose = require("mongoose");



// create schemas for product 
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    richDescription:{
        type: String,
        default: null
    },
    image:[{
        type:String
    }],
    price: {
        type: Number,
        default: 0
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    rating:{
        type: Number,
        default: 0,
    },
    reviews:{
        type: Number,
        default: 0,
    },
    featured:{
        type:Boolean,
        default: false
    },
    created_on:{
        type: Date,
        default: Date.now
    }

});

// create Collection in mongoDB 
exports.Product = mongoose.model('product', productSchema);