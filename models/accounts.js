const mongoose = require("mongoose")
const Schema = mongoose.Schema
const proSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },

    phoneNo: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    delivery_addr: {
        type: String,
        required: true
    },


    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Account = mongoose.model("UserAccount", proSchema)
module.exports = Account