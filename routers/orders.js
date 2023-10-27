const { Order } = require("../models/order");
const express = require("express");
const router = express.Router();
const { OrderItem } = require("../models/order-item");
const mongoose = require("mongoose");


// create new order 
router.post("/", async (req, res) => {


    // create order item for Order 
    // (convert multiple promise to one) : Promise.all();

    const orderItemsIds = Promise.all(req.body.orderItems.map(async orderItem => {
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
        });

        newOrderItem = await newOrderItem.save();
        return newOrderItem._id;

    }));

    // get only ids 
    const orderItemsIdsResolved = await orderItemsIds;

    // calculate price in an array 
    const totalPriceArr = await Promise.all(orderItemsIdsResolved.map(async orderItemId => {
        const orderItem = await OrderItem.findById(orderItemId).populate("product", "price");

        // return each product price according to their quantity 
        return orderItem.product.price * orderItem.quantity;
    }))


    const totalPrice = totalPriceArr.reduce((a, b) => a + b, 0);

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
        totalPrice: totalPrice,
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
    Order.find().populate("user", ["name", "email"]).populate({ path: "orderItems", populate: { path: "product", populate: "category" } }).sort({ "orderedDate": -1 }).then((response) => {
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

    const order = await Order.findById(req.params.id).populate("user", ["name", "email"]).populate({ path: "orderItems", populate: { path: "product", populate: "category" } }).sort({ "orderedDate": -1 });
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
});



// delete order 
router.delete("/:id", (req, res) => {

    let id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, message: "Invalid Order id!" });
    }

    // delete each order and their children 
    Order.findByIdAndRemove(id).then(async order => {

        if (order) {
            await order.orderItems.map(async orderItemId => {
                await OrderItem.findByIdAndRemove(orderItemId);
            });
        }
        return res.status(200).json({ success: true, message: "Order is deleted!" });

    }).catch((error) => {
        check = false;
        return res.status(500).json({ success: false, error: error });
    })

});


// calculate total Sales 
router.get("/get/totalsales", async (req, res) => {

    const totalSales = await Order.aggregate([
        { $group: { _id: null, totalsales: { $sum: "$totalPrice" } } },
    ]);

    if(!totalSales){
        return res.status(400).json({success: false,message: "The Order sales cannot be generated!"});
    }

    return res.status(200).json({success: true,totalSales: totalSales.pop().totalsales});

});


// calculate total order count 
router.get("/get/count", async (req, res) => {

    const count = await Order.countDocuments();

    if(!count){
        return res.status(400).json({success: false,message: "No Orders available!"});
    }

    return res.status(200).json({success: true,count});

});




module.exports = router;


