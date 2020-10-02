const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    categoryid: {
        type: String,
        required: true,
    },

    itemname: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
        default: 0,
    },

    quantity: {
        type: Number,
        required: true,
        default: 0,
    },

    discount: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
        required: true,
    },
});

module.exports = Item = mongoose.model("item", ItemSchema);
