const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

//ADD items to cart
router.post("/", auth, async (req, res) => {
  const { productID, quantity } = req.body;
  const product = {
    product: productID,
    quantity,
  };

  try {
    let item = await Product.findById(productID);
    if (Number(quantity) > Number(item.availability)) {
      res.json({ msg: "Quantity not available in stock" });
    } else {
      await Product.findByIdAndUpdate(productID, {
        availability: Number(item.availability) - Number(quantity),
      });

      let cart = await Cart.findOne({ user: req.user.id });

      if (cart) {
        let { products, id } = cart;
        let found = false;

        products.map(product => {
          if (product.product.toString() === productID) {
            product.quantity += Number(quantity);
            found = true;
          }
        });

        if (!found) {
          products.push(product);
        }

        cart = await Cart.findByIdAndUpdate(id, { products });
        res.json({ msg: "Item added to cart" });
      } else {
        cart = new Cart({
          user: req.user.id,
          products: product,
        });
        cart.save();
        res.json({ msg: "Item added to cart" });
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
    let { products } = cart;
    let quantity;
    products = products.filter(product => {
      if (product.product.toString() !== productID) {
        return product;
      }
      quantity = product.quantity;
    });
    await Product.findByIdAndUpdate(productID, {
      $inc: { availability: quantity },
    });
    await Cart.findByIdAndUpdate(cart.id, { products });
    res.json({ msg: "Item removed from cart successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
