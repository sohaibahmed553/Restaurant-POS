const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    customername: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    specialdiscount: {
        type: Number,
        default: 0,
        required: true,
    },
});

module.exports = Customer = mongoose.model("customer", CustomerSchema);
