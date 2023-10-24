const express = require("express");
const { User } = require("../models/user");
const router = express.Router();
const mongoose = require("mongoose");

// hashing user password 
const bcrypt = require("bcryptjs");


// get all users 
router.get("/",async (req,res)=>{
    const users = await User.find().select("-passwordHash");

    if(!users){
       return res.status(500).json({success: false})
    }

    return res.status(200).send(users)
})


// create new user 
router.post("/",async(req,res)=>{
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password,10),
        phone: req.body.phone,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
        admin: req.body.admin,
    });


    // save to database 
    user = await user.save();

    if(!user){
        return res.status(400).json({success: false, message: "User cannot be created!"});
    }
    return res.status(201).send(user);
})



// get single user 
router.get("/:id", async (req, res) => {

    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ success: false, message: "Invalid User id!" });
    }

    const user = await User.findById(req.params.id).select("-passwordHash");;
    if (!user) {
        res.status(500).json({ message: "The user with the given id was not found!" });
    }
    res.status(200).send(user);
})


module.exports = router;
