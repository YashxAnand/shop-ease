const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

//Add products
router.post("/", async (req, res) => {
  const { name, category, price, availability, description } = req.body;

  let product = new Product({
    name,
    category,
    price,
    availability,
    description,
  });

  product.save();

  res.json({ msg: "Product added successfully" });
});

module.exports = router;
