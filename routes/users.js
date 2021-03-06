const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

router.post(
  "/register",
  [
    check("name", "Name's length should be between 2 to 30").isLength({
      min: 2,
      max: 30,
    }),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password should contain atleast 6 characters").isLength({
      min: 6,
    }),
    check("phone", "Please enter your phone number").not().isEmpty(),
    check("phone", "Please enter a valid phone number").isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
      .array()
      .map(error => error.msg);

    if (errors.length !== 0) {
      res.status(400).json({ msg: errors });
    }

    const { name, email, password, phone } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({ msg: ["Email already in use"] });
      } else {
        user = new User({ name, email, password, phone });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        user.save();

        const payload = {
          user: {
            id: user.id,
          },
        };

        const secret = config.get("jwtSecret");

        jwt.sign(payload, secret, { expiresIn: 36000000 }, (err, token) => {
          if (err) throw err;
          res.json({ token });
        });
        let cart = new Cart({
          user: user.id,
          products: [],
          total: 0,
        });
        let order = new Order({
          user: user.id,
          orders: [],
        });
        cart.save();
        order.save();
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ msg: ["Server error"] });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter password").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
      .array()
      .map(error => error.msg);

    if (errors.length !== 0) {
      res.status(400).json({ msg: errors });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        res.status(404).json({ msg: ["Invalid email"] });
      } else {
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          res.status(400).json({ msg: ["Incorrect password"] });
        } else {
          const payload = {
            user: {
              id: user.id,
            },
          };

          jwt.sign(
            payload,
            config.get("jwtSecret"),
            { expiresIn: 36000000 },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );
        }
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ msg: ["Server error"] });
    }
  }
);

router.get("/", auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (err) {
    res.status(500).json({ msg: ["Server error"] });
  }
});

router.post(
  "/edit-profile",
  [
    auth,
    check("name", "Name's length should be between 2 to 30").isLength({
      min: 2,
      max: 30,
    }),
    check("email", "Please enter a valid email").isEmail(),
    check("phone", "Please enter your phone number").not().isEmpty(),
    check("phone", "Please enter a valid phone number").isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
      .array()
      .map(error => error.msg);

    if (errors.length !== 0) {
      res.status(400).json({ msg: errors });
    } else {
      const { name, email, phone } = req.body;

      try {
        let user = await User.findOne({ email });
        if (user && user._id.toString() !== req.user.id) {
          res.status(400).json({ msg: ["Email already in use"] });
        } else {
          user = await User.findById(req.user.id);
          user.name = name;
          user.email = email;
          user.phone = phone;
          user.save();
          res.json({ msg: "Profile updated successfully" });
        }
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: ["Server error"] });
      }
    }
  }
);

module.exports = router;
