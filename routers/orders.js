const {Order} = require("../models/order");
const express = require("express");
const router = express.Router();
const { OrderItem } = require("../models/order-item");


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
    Order.find().then((response) => {
        return res.status(200).json(response);
    }).catch((error) => {
        return res.status(500).send(error);
    })
})





module.exports = router;