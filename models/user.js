const mongoose = require("mongoose");



const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    street: {
        type: String,
        default: null
    },
    apartment: {
        type: String,
        default: null
    },
    zip: {
        type: String,
        default: null
    },
    city: {
        type: String,
        default: null
    },
    country: {
        type: String,
        default: null
    },
    admin: {
        type: Boolean,
        default: false
    }
},
{
    toJSON : {virtuals : true} // for alias
});


userSchema.virtual("id").get(function(){
    return this._id;
})


exports.User = mongoose.model('user', userSchema);

