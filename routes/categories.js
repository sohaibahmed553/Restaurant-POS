const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Category = require("../models/Category");
const Item = require("../models/Item");

//@route    GET api/categories
//@desc     Get Categories
//@access   Public
router.get(
    "/",

    async (req, res) => {
        try {
            const categories = await Category.find();

            res.send(categories);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

//@route    POST api/categories
//@desc     Add Category
//@access   Public
router.post(
    "/",
    [check("categoryname", "Please enter a category.").not().isEmpty()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { categoryname } = req.body;
        try {
            let category = new Category({
                categoryname,
            });

            await category.save();

            res.send("Category saved.");
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

//@route    PUT api/categories
//@desc     Update Category
//@access   Public
router.put(
    "/:id",
    [
        check("categoryname", "Please enter a category.").not().isEmpty(),
        check("discount", "Please enter a discount between 0 and 100.")
            .isInt({ min: 0, max: 100 })
            .not()
            .isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { categoryname, discount } = req.body;
        const { id } = req.params;
        try {
            const items = await Item.updateMany(
                { categoryid: id },
                { discount }
            );
            const category = await Category.findById(id);

            (category.categoryname = categoryname),
                (category.discount = discount);

            await category.save();

            res.send("Category updated.");
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

//@route    Delete api/categories
//@desc     Delete Categories and also delete all the items in that category
//@access   Public
router.delete(
    "/:id",

    async (req, res) => {
        try {
            await Item.deleteMany({ categoryid: req.params.id });

            await Category.deleteOne({ _id: req.params.id });

            res.send("Category and it's items deleted.");
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

module.exports = router;
