const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

//@route    GET api/users
//@desc     Test Route
//@access   Public
router.get("/", (req, res) => {
    const users = [
        { id: "1", name: "sohaib" },
        { id: "2", name: "haseeb" },
    ];
    res.send(users);
});

//@route    POST api/users
//@desc     Register User
//@access   Public
router.post(
    "/",
    [
        check("username", "Please enter a valid username.").not().isEmpty(),
        // password must be at least 6 chars long
        check("password", "Enter password of atleast 6 characters.").isLength({
            min: 6,
        }),
        check("isAdmin", "Please enter if registration is for an admin or not.")
            .not()
            .isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { username, isAdmin, password } = req.body;
        try {
            let user = await User.findOne({ username });
            if (user) {
                return res.status(400).json({
                    errors: [{ msg: "User already exist" }],
                });
            }

            user = new User({
                username,
                password,
                isAdmin,
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            res.send("User registered");
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

module.exports = router;
