const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// include product schema
const {Product} = require("../models/product"); 
const { Category } = require("../models/category");


//====================  routes
// insert new product
router.post("/", async(req, res) => {

    const category = await Category.findById(req.body.category);
    if(!category){
        return res.status(400).json({success:false,message:"Invalid Category!"});
    }

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock,
        rating: req.body.rating,
        review: req.body.review,
        featured: req.body.featured,
       
    });

    //    save to database 
   product = await product.save();

   if(!product){
    return res.status(500).json({success: false,message:product});
   }

   return res.status(200).send(product);

});



// get all products 
router.get("/", async (req, res) => {
    // all product along with their category 
    const products = await Product.find().populate("category");
    if(!products){
        return res.status(404).json({success:false,message:"No products found!"});
    }
    res.status(200).send(products);
});


// get single product 
router.get("/:id", async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).json({success:false,message:"Invalid Product id!"});
    }

    const product = await Product.findById(req.params.id).populate("category");
    if(!product){
        return res.status(404).json({success:false,message:"Product not found!"});
    }
    
    res.status(200).send(product);
});


// update product 
router.put("/:id",async(req,res)=>{

    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).json({success:false,message:"Invalid Product id!"});
    }

    const category = await Category.findById(req.body.category);
    if(!category){
        return res.status(400).json({success:false,message:"Invalid Category!"});
    }

    const product = await Product.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock,
        rating: req.body.rating,
        review: req.body.review,
        featured: req.body.featured,
    },{new:true}); // return updated data

    if(!product){
        return res.status(404).send("The Product cannot be created!");
    }
    res.status(200).send(product);
})


// delete product 
router.delete("/:id",(req,res)=>{

    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).json({success:false,message:"Invalid Product id!"});
    }


    Product.findByIdAndRemove(req.params.id).then( product =>{
        if(product){
            return res.status(200).json({success:true,message:"The Product is deleted!"});
        }else{
            return res.status(404).json({success:false,message: "The Product id not found!"});
        }
    }).catch((error)=>{
        return res.status(400).json({success: false,error: error});
    })

});



module.exports = router;
