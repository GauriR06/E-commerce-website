//BIG BOYS

const mongoose = require("mongoose")
const Schema = mongoose.Schema
const proSchema = new Schema({
    // men/women/kids
    category: {     
        type: String,
        required: true
    },

    prod_name: {
        type: String,
        required: true
    },

    price: {
        type: String,
        required: true
    },

    prod_desc: {
        type: String,
        required: true
    },

    img1: {
        type: String,
        required: true
    },

    img2: {
        type: String,
        required: true
    },

    img3: {
        type: String,
        required: true
    },

    img4: {
        type: String,
        required: true
    },
    main_img: {
        type: String,
        required: true
    }
}, {timestamps: true})

const BigBoysProduct = mongoose.model("BigBoysProduct", proSchema)
module.exports = BigBoysProduct