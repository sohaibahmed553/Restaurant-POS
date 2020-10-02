const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Customer = require("../models/Customer");

//@route    GET api/customers
//@desc     Get All customers
//@access   Public
router.get(
    "/",

    async (req, res) => {
        try {
            const customers = await Customer.find();

            res.send(customers);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

//@route    POST api/customers
//@desc     Add new Customer
//@access   Public
router.post(
    "/",
    [
        check("customername", "Please enter customer name.").not().isEmpty(),
        check("contact", "Please enter contact.").not().isEmpty(),
        check("specialdiscount", "Please enter discount.").not().isEmpty(),
    ],

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { customername, contact, specialdiscount } = req.body;
        try {
            //checking that if the customer have some special discount
            const customer = await Customer.findOne({ contact: contact });

            if (customer) {
                //customer.specialdiscount = specialdiscount;
                //customer.customername = customername;
                //await customer.save();
                return res.status(400).json({
                    errors: [{ msg: "Contact already exist" }],
                });
            } else {
                //creating the customer object
                let customerObj = new Customer({
                    customername,
                    contact,
                    specialdiscount,
                });
                await customerObj.save();
            }

            res.send("Customer saved.");
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

//@route    PUT api/customers/:id
//@desc     Update customername,contact and specialdiscount of the item if contact already does not exists
//@access   Public
router.put(
    "/:id",
    [
        check("customername", "Please enter customer name.").not().isEmpty(),
        check("contact", "Please enter contact.").isInt().not().isEmpty(),
        check("specialdiscount", "Please enter special discount")
            .isInt({ min: 0, max: 100 })
            .not()
            .isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { customername, contact, specialdiscount } = req.body;
        const { id } = req.params;
        try {
            const customer = await Customer.findById(id);

            const customerByContact = await Customer.findOne({
                contact: contact,
            });

            if (
                customerByContact &&
                JSON.stringify(customer._id) !==
                    JSON.stringify(customerByContact._id)
            ) {
                return res.status(400).json({
                    errors: [{ msg: "Contact already exist" }],
                });
            } else {
                customer.customername = customername;
                customer.contact = contact;
                customer.specialdiscount = specialdiscount;

                await customer.save();
            }

            res.send("Customer Updated.");
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

//@route    Delete api/customers
//@desc     Delete a saved customer
//@access   Public
router.delete(
    "/:id",

    async (req, res) => {
        try {
            await Customer.deleteOne({ _id: req.params.id });

            res.send("Customer deleted.");
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

module.exports = router;
