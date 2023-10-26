const mongoose = require("mongoose");

const orderItemSchema = mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }
},
{
    toJSON : {virtuals : true} // for alias
});


orderItemSchema.virtual("id").get(function(){
    return this._id;
})

exports.OrderItem = mongoose.model("OrderItem",orderItemSchema);

