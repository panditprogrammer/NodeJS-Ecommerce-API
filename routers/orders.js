const {Order} = require("../models/order");
const express = require("express");
const router = express.Router();
const { OrderItem } = require("../models/order-item");
const mongoose = require("mongoose");
const { populate } = require("dotenv");

// create new order 
router.post("/",async (req, res) => {


    // create order item for Order 
    // (convert multiple promise to one) : Promise.all();

    const orderItemsIds = Promise.all(req.body.orderItems.map( async orderItem => {
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
        });

        newOrderItem = await newOrderItem.save();
        return newOrderItem._id;

    }));

    // get only ids 
    const orderItemsIdsResolved = await orderItemsIds; 


    // create Order 
    let order = new Order({
        orderItems: orderItemsIdsResolved,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: req.body.totalPrice,
        user: req.body.user,
    });

    order.save().then((response) => {
        return res.status(200).json(response);
    }).catch((error) => {
        return res.status(400).send({ success: false, message: error });
    });

});



// get all orders 
router.get("/", (req, res) => {

    // get user's info by reference sort the result newest first
    Order.find().populate("user",["name","email"]).populate({path: "orderItems", populate: {path: "product", populate: "category"}}).sort({"orderedDate": -1}).then((response) => {
        return res.status(200).json(response);
    }).catch((error) => {
        return res.status(500).send(error);
    })
})



// get single order 
router.get("/:id", async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ success: false, message: "Invalid Order id!" });
    }

    const order = await Order.findById(req.params.id).populate("user",["name","email"]).populate({path: "orderItems", populate: {path: "product", populate: "category"}}).sort({"orderedDate": -1});
    if (!order) {
        return res.status(404).json({ success: false, message: "Order not found!" });
    }

    res.status(200).send(order);
});



// update order 
router.put("/:id", async (req, res) => {

    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ success: false, message: "Invalid order id!" });
    }

    const order = await Order.findByIdAndUpdate(req.params.id, {
       status: req.body.status
    }, { new: true }); // return updated data

    if (!order) {
        return res.status(404).send("The order cannot be updated!");
    }
    res.status(200).send(order);
})



// delete delete 
router.delete("/delete/", (req, res) => {
    let filter = {};

    // delete multiple documents 
    if (req.query.id) {
        filter = { _id: { $in: req.query.id.split(",") } };
    }


    Order.deleteMany(filter).then(order => {
        return res.status(200).json(order);
    }).catch((error) => {
        return res.status(400).json({ success: false, error: error });
    })

});


module.exports = router;