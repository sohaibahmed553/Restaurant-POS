const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Order = require("../models/Order");
const Customer = require("../models/Customer");

//@route    GET api/orders
//@desc     Get All Orders
//@access   Public
router.get(
    "/",

    async (req, res) => {
        try {
            const orders = await Order.find();

            res.send(orders);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

//@route    GET api/orders/paid
//@desc     Get All paid Orders
//@access   Public
router.get(
    "/paid",

    async (req, res) => {
        try {
            const orders = await Order.find({ paid: 1 });

            res.send(orders.reverse());
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

//@route    GET api/orders/unpaid
//@desc     Get All unpaid Orders
//@access   Public
router.get(
    "/unpaid",

    async (req, res) => {
        try {
            const orders = await Order.find({ paid: 0 });

            res.send(orders.reverse());
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

//@route    GET api/orders/:id
//@desc     Get Details of the order of given id
//@access   Public
router.get(
    "/one/:id",

    async (req, res) => {
        try {
            const { id } = req.params;
            const order = await Order.findById(id);

            res.send(order);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

//@route    POST api/orders
//@desc     Add new Order
//@access   Public
router.post(
    "/",
    [
        check("type", "Please enter a type of order.").not().isEmpty(),
        check("items", "Please enter items.").not().isEmpty(),
        check("total", "Please enter total amount.").not().isEmpty(),
        check("customername", "Please enter customer name.").not().isEmpty(),
        check("contact", "Please enter contact number.").not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let date_ob = new Date();
        // current date
        // adjust 0 before single digit date
        let day = ("0" + date_ob.getDate()).slice(-2);
        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        // current year
        let year = date_ob.getFullYear();

        const date = day + "-" + month + "-" + year;

        const { type, items, total, customername, contact } = req.body;
        try {
            //checking that if the customer have some special discount
            const customer = await Customer.findOne({ contact: contact });

            let specialdiscount = 0;
            if (customer) specialdiscount = customer.specialdiscount;

            //creating the order object
            let order = new Order({
                type,
                items,
                customername,
                specialdiscount,
                contact,
                total,
                date,
            });

            await order.save();

            res.send("Order saved.");
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

//@route    PUT api/orders/pay/:id
//@desc     Update the order details when it gets paid
//@access   Public
router.put(
    "/pay/:id",
    [
        check("cash", "Please enter cash paid.").isInt().not().isEmpty(),
        check("discount", "Please enter discount.").isInt().not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { cash, discount } = req.body;
        const { id } = req.params;
        try {
            const order = await Order.findById(id);

            order.paid = "1";
            order.cash = cash;
            order.discount = discount;

            await order.save();

            res.send("Order updated.");
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

module.exports = router;
