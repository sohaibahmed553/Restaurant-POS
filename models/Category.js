const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    categoryname: {
        type: String,
        required: true,
    },
    discount: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
        required: true,
    },
});

module.exports = Category = mongoose.model("category", CategorySchema);
