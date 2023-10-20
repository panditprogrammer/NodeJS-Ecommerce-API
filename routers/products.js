const express = require("express");
const router = express.Router();
// include product schema
const {Product} = require("../models/product"); 


//====================  routes
router.post("/", (req, res) => {
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



router.get("/", async (req, res) => {
    const products = await Product.find();
    res.send(products);
})


module.exports = router;
