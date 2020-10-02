const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Category = require("../models/Item");

//@route    GET api/items/:id
//@desc     Get all items of a category
//@access   Public
router.get(
    "/:id",

    async (req, res) => {
        try {
            const items = await Item.find({ categoryid: req.params.id });
            res.send(items);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

//@route    GET api/items/one/:id
//@desc     Get one requested item of the given id
//@access   Public
router.get(
    "/one/:id",

    async (req, res) => {
        try {
            const items = await Item.find({ _id: req.params.id });
            res.send(items);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

//@route    POST api/items
//@desc     Add Item
//@access   Public
router.post(
    "/",
    [
        check("categoryid", "Please enter a category id.").not().isEmpty(),
        check("itemname", "Please enter item name.").not().isEmpty(),
        check("price", "Please enter price.").isInt().not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { categoryid, itemname, price } = req.body;
        try {
            let item = new Item({
                categoryid,
                itemname,
                price,
            });

            await item.save();

            res.send("Item saved.");
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

//@route    PUT api/items/quantity/:id
//@desc     Update the quantity of item
//@access   Public
router.put(
    "/quantity/:id",
    [check("quantity", "Please enter quantity.").isInt().not().isEmpty()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { quantity } = req.body;
        const { id } = req.params;
        try {
            const item = await Item.findById(id);

            item.quantity = quantity;

            await item.save();

            res.send("Quantity of item updated.");
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

//@route    PUT api/items/:id
//@desc     Update itemname,discount and price of the item
//@access   Public
router.put(
    "/:id",
    [
        check("itemname", "Please enter item name.").not().isEmpty(),
        check("price", "Please enter price.").isInt().not().isEmpty(),
        check("discount", "Please enter discount")
            .isInt({ min: 0, max: 100 })
            .not()
            .isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { itemname, price, discount } = req.body;
        const { id } = req.params;
        try {
            const item = await Item.findById(id);

            item.itemname = itemname;
            item.price = price;
            item.discount = discount;

            await item.save();

            res.send("Item Updated.");
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

//@route    Delete api/items/:id
//@desc     Delete item
//@access   Public
router.delete(
    "/:id",

    async (req, res) => {
        const { id } = req.params;

        try {
            const item = await Item.findById(id);

            await item.delete();

            res.send("Item Deleted.");
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

module.exports = router;
