const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

//ADD items to cart
router.post("/", auth, async (req, res) => {
  const { productID, quantity } = req.body;
  let product = {
    product: productID,
    quantity,
  };

  try {
    let item = await Product.findById(productID);
    if (Number(quantity) > Number(item.availability)) {
      res.status(400).json({ msg: "Quantity not available in stock" });
    } else {
      await Product.findByIdAndUpdate(productID, {
        availability: Number(item.availability) - Number(quantity),
      });
      product.cost = Number(quantity) * Number(item.price);
      product.name = item.name;

      let cart = await Cart.findOne({ user: req.user.id });

      if (cart) {
        let { products, id, total } = cart;
        let found = false;

        total += product.cost;

        products.map(product => {
          if (product.product.toString() === productID) {
            product.quantity += Number(quantity);
            product.cost += Number(quantity) * Number(item.price);
            found = true;
          }
        });

        if (!found) {
          products.push(product);
        }

        cart = await Cart.findByIdAndUpdate(id, { products, total });
        res.json({ msg: "Added to cart" });
      } else {
        cart = new Cart({
          user: req.user.id,
          products: product,
          total: product.cost,
        });
        cart.save();
        res.json({ msg: "Added to cart" });
      }
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

//DELETE item from Cart
router.delete("/", auth, async (req, res) => {
  const { productID } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user.id });
    let { products, total } = cart;
    let quantity;
    let cost;
    products = products.filter(product => {
      if (product.product.toString() !== productID) {
        return product;
      }
      quantity = product.quantity;
      cost = product.cost;
    });
    total -= cost;
    await Product.findByIdAndUpdate(productID, {
      $inc: { availability: quantity },
    });
    await Cart.findByIdAndUpdate(cart.id, { products, total });
    res.json({ msg: "Item removed from cart successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

//UPDATE items in cart
router.put("/", auth, async (req, res) => {
  const { productID, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user.id });
    let { products, total } = cart;
    let qtychange, costchange;
    products.map(product => {
      if (product.product.toString() == productID) {
        qtychange = product.quantity - Number(quantity);
        costchange =
          product.cost - (Number(quantity) * product.cost) / product.quantity;
        product.cost = (Number(quantity) * product.cost) / product.quantity;
        product.quantity = quantity;
      }
    });
    total -= costchange;
    await Cart.findOneAndUpdate({ user: req.user.id }, { products, total });

    await Product.findByIdAndUpdate(productID, {
      $inc: { availability: qtychange },
    });

    res.json({ msg: "Update Successful" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

//GET cart
router.get("/", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne(
      { user: req.user.id },
      { products: 1, total: 1 }
    ).select("-_id");
    res.json({ cart });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
