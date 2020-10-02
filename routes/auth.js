const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const auth = require("../middleware/auth");

const User = require("../models/User");

//@route    GET api/auth
//@desc     Test Route
//@access   Public
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//@route    POST api/auth
//@desc     Authenticate User and get token
//@access   Public
router.post(
    "/",
    [
        check("username", "Please enter a valid username.").not().isEmpty(),
        // password must be at least 6 chars long
        check("password", "Password is required.").not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { username, password } = req.body;
        try {
            let user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json({
                    errors: [{ msg: "Invalid Credentials." }],
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({
                    errors: [{ msg: "Invalid Credentials." }],
                });
            }

            const payload = {
                user: { id: user.id },
            };

            jwt.sign(payload, config.get("jwtSecret"), (err, token) => {
                if (err) throw err;
                res.json({ token });
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

module.exports = router;