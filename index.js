const express = require("express");
const server = express();

require("dotenv/config");
const port = process.env.PORT;
const api_url = process.env.API_URL;

// middleware for json 
const bodyParser = require("body-parser");
server.use(bodyParser.json());

// for http request log 
const morgan = require("morgan");
server.use(morgan("tiny"))

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
const Product = mongoose.model('product', productSchema);


//====================  routes
server.post(api_url + "/products", (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        stock: req.body.stock
    });

    //    save to database 
    product.save().then((created) => {
        res.status(201).json(created);
    }).catch((error) => {
        res.status(500).json({
            error: error,
            success: false
        });
    });
});


server.get(api_url+"/products",async (req,res)=>{
    const products = await Product.find();
    res.send(products);
})



// connect with database 
mongoose.connect(process.env.CONNECTION_STRING, {
    dbName: "nodeapidb"
})
    .then(() => {
        console.log("MongoDB Connected!");
    }).catch((error) => {
        console.log(error);
    })

server.listen(port, () => {
    console.log(`server is running http://localhost:${port}${api_url}`);
});