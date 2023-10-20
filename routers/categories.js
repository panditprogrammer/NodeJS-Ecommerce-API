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
    res.status(200).send(category);

});


// get all categories 
router.get("/",async(req,res)=>{
    let categories = await Category.find();
    res.status(200).send(categories);
    
})


// get single category 
router.get("/:id",async(req,res)=>{
    const category = await Category.findById(req.params.id);
    if(!category){
        res.status(500).json({message:"The category with the given id was not found!"});
    }
    res.status(200).send(category);
})



// update category 
router.put("/:id",async(req,res)=>{
    const category = await Category.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    },{new:true}); // return updated data

    if(!category){
        return res.status(404).send("The Category cannot be created!");
    }
    res.status(200).send(category);
})

// delete a category 
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

