const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

//Add products
router.post("/", async (req, res) => {
  const {
    name,
    category,
    price,
    availability,
    featured,
    description,
  } = req.body;

  let product = new Product({
    name,
    category,
    price,
    availability,
    featured,
    description,
  });

  product.save();

  res.json({ msg: "Product added successfully" });
});

router.put("/", async (req, res) => {
  const { featured } = req.body;

  try {
    const product = await Product.updateMany(
      { category: "Furnitures" },
      { featured }
    );
    res.json({ product });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: ["Server Error"] });
  }
});

//GET featured items
router.get("/featured", async (req, res) => {
  try {
    const products = await Product.find({ featured: true });
    res.json({ products });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: ["Server Error"] });
  }
});

module.exports = router;
