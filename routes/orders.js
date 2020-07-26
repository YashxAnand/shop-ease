const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Order = require("../models/Order");
const Cart = require("../models/Cart");

router.post("/", auth, async (req, res) => {
  const {
    name,
    mobile,
    zip_code,
    address_line1,
    address_line2,
    city,
    state,
    total,
    products,
  } = req.body;

  const order_object = {
    name,
    mobile,
    address: {
      line1: address_line1,
      line2: address_line2,
      zip_code,
      city,
      state,
    },
    total,
    products,
  };

  try {
    let order = await Order.findOne({ user: req.user.id });
    order.orders.push(order_object);
    order.save();
    let cart = await Cart.findOne({ user: req.user.id });
    cart.products = [];
    cart.total = 0;
    cart.save();
    res.json({ msg: "Order confirmed" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

//GET order
router.get("/", auth, async (req, res) => {
  try {
    const order = await Order.findOne({ user: req.user.id });
    res.json({ order });
  } catch (error) {
    console.log(error.message);
    res.json({ msg: "Server Error" });
  }
});

module.exports = router;
