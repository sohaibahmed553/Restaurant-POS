const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    paid: {
        type: Number,
        min: 0,
        max: 1,
        default: 0,
        required: true,
    },
    customername: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    items: {
        type: Array,
        default: [],
    },
    total: {
        type: Number,
        required: true,
    },
    cash: {
        type: Number,
        default: 0,
        required: true,
    },
    discount: {
        type: Number,
        default: 0,
        required: true,
    },
    specialdiscount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
        required: true,
    },
    date: {
        required: true,
        type: String,
    },
});

module.exports = Order = mongoose.model("order", OrderSchema);
