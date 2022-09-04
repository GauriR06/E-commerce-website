const mongoose = require("mongoose")
const Schema = mongoose.Schema
const proSchema = new Schema({
    
    delivery_addr: {
        type: String,
        required: true
    }
}, {timestamps: true})

const SignedInAcc = mongoose.model("signedInacc", proSchema)
module.exports = SignedInAcc