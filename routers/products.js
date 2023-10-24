const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
var { expressjwt: jwt } = require("express-jwt");

// include product schema
const { Product } = require("../models/product");
const { Category } = require("../models/category");

// for file upload 
const multer = require("multer");

const fileTypeMap = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // validate image type 
        const isValid = fileTypeMap[file.mimetype];
        let uploadError = "only png,jpeg,jpg files allowed!";

        if (isValid) {
            uploadError = null;
        }
        cb(uploadError, 'public/uploads')
    },

    filename: function (req, file, cb) {
        let fileName = file.originalname.substring(0, file.originalname.lastIndexOf("."));
        let extension = fileTypeMap[file.mimetype];

        const uniqueFilename = fileName.replace(" ", "-") + '_' + Date.now() + "." + extension;
        cb(null, uniqueFilename);
    }
})

const uploadOptions = multer({ storage: storage })



//====================  routes
// insert new product
router.post("/", async (req, res) => {

    const category = await Category.findById(req.body.category);
    if (!category) {
        return res.status(400).json({ success: false, message: "Invalid Category!" });
    }

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        images: [],
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

    if (!product) {
        return res.status(500).json({ success: false, message: product });
    }

    return res.status(200).send(product);

});


// get all products 
router.get("/", (req, res) => {
    // limit products list 
    const limit = req.query.limit > 0 ? req.query.limit : 0;

    // offset (start from)
    const offset = req.query.offset > 0 ? req.query.offset : 0;

    // filter products 
    let filter = {};

    // by categories 
    if (req.query.categories) {
        filter.category = { $in: req.query.categories.split(",") };
    }

    // by featured 
    if (req.query.featured) {
        filter.featured = req.query.featured;
    }

    // by brands 
    if (req.query.brands) {
        filter.brand = { $in: req.query.brands.split(",") };
    }

    // by price 
    let min_price = req.query.min > 0 ? req.query.min : 0;
    let max_price = req.query.max > 0 ? req.query.max : 0;

    if (min_price) {
        filter.price = { $gt: parseInt(min_price) };
    }
    if (max_price) {
        filter.price = { $lt: parseInt(max_price) };
    }


    // all product along with their category 
    Product.find(filter).populate("category").limit(parseInt(limit)).skip(offset).then((products) => {
        return res.status(200).json(products);
    }).catch((error) => {
        return res.status(400).json({ success: false, error: error });
    });

});


// get single product 
router.get("/:id", async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ success: false, message: "Invalid Product id!" });
    }

    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
        return res.status(404).json({ success: false, message: "Product not found!" });
    }

    res.status(200).send(product);
});


// update product 
router.put("/:id",async (req, res) => {

    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ success: false, message: "Invalid Product id!" });
    }

    const category = await Category.findById(req.body.category);
    if (!category) {
        return res.status(400).json({ success: false, message: "Invalid Category!" });
    }


    const product = await Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock,
        rating: req.body.rating,
        review: req.body.review,
        featured: req.body.featured,
    }, { new: true }); // return updated data

    if (!product) {
        return res.status(404).send("The Product cannot be updated!");
    }
    res.status(200).send(product);
})


// delete one or more product(s) by id
router.delete("/delete", (req, res) => {
    let filter = {};

    // delete multiple documents 
    if (req.query.id) {
        filter = { _id: { $in: req.query.id.split(",") } };
    }


    Product.deleteMany(filter).then(product => {
        return res.status(200).json(product);
    }).catch((error) => {
        return res.status(400).json({ success: false, error: error });
    })

});


// upload multiple files and update product image gallery by id
router.put("/uploads/:id", uploadOptions.array("images", 5), async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ success: false, message: "Invalid Product id!" });
    }

    const files = req.files;
    let imagesPaths = [];


    if (!files) {
        return res.status(400).json({ success: false, message: "Images are required!" });
    }


    files.map( file => {
        imagesPaths.push(`${req.protocol}://${req.get("host")}/public/uploads/${file.filename}`);
    });


    const product = await Product.findByIdAndUpdate(req.params.id, {
        images: imagesPaths
    }, { new: true }); // return updated data


    if (!product) {
        return res.status(404).send("The Product cannot be updated!");
    }
    res.status(200).send(product);

});


module.exports = router;
