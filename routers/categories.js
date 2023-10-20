const express = require("express");
const { Category } = require("../models/category");
const router = express.Router();

// insert new category 
router.post("/", async(req,res)=>{
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
    });

    category = await category.save();

    if(!category){
        return res.status(404).send("The Category cannot be created!");
    }
    res.send(category);

});


// get all categories 
router.get("/",async(req,res)=>{
    let categories = await Category.find();
    res.send(categories);
    
})



router.delete("/:id",(req,res)=>{
    Category.findByIdAndRemove(req.params.id).then( category =>{
        if(category){
            return res.status(200).json({success:true,message:"The Category is deleted!"});
        }else{
            return res.status(404).json({success:false,message: "The Category id not found!"});
        }
    }).catch((error)=>{
        return res.status(400).json({success: false,error: error});
    })

});


module.exports = router;

