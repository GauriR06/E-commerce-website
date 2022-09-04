const mongoose = require("mongoose")
const Schema = mongoose.Schema
const proSchema = new Schema({
    prod_id: {
        type: String,
        required: true
    },

    prod_name: {
        type: String,
        required: true
    },

    prod_price: {
        type: String,
        required: true
    },

    prod_size: {
        type: String,
        required: true
    },

    prod_quantity: {
        type: String,
        required: true
    },

    prod_mainImg: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Cart = mongoose.model("CartItem", proSchema)
module.exports = Cart