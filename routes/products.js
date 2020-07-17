const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const User = require("../models/User");
const auth = require("../middleware/auth");

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

//GET searched items
router.get("/search/:query", async (req, res) => {
  try {
    const regex = new RegExp(`.*${req.params.query}.*`, "gi");
    let items = await Product.find({
      $or: [{ name: regex }, { category: regex }, { description: regex }],
    });
    if (items.length === 0) {
      res.status(404).json({ msg: "No product found" });
    } else {
      res.json({ items });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

//GET a product by id
router.get("/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    res.json({ product });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: "Server error" });
  }
});

//POST a review
router.post("/review/:id", auth, async (req, res) => {
  const { comment, rating } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const name = user.name;
    const review = { comment, rating, name, user: req.user.id };
    let product = await Product.findById(req.params.id);
    product.reviews.push(review);
    product.avg_rating = (
      (product.avg_rating * (product.reviews.length - 1) + Number(rating)) /
      product.reviews.length
    ).toFixed(2);
    product.save();
    res.json({ product });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

//Delete a review
router.delete("/review/:product_id/:review_id", auth, async (req, res) => {
  try {
    let product = await Product.findById(req.params.product_id);
    product.reviews = product.reviews.filter(review => {
      if (review._id.toString() !== req.params.review_id) return review;

      if (product.reviews.length == 1) product.avg_rating = 0;
      else {
        product.avg_rating = (
          (product.avg_rating * product.reviews.length - review.rating) /
          (product.reviews.length - 1)
        ).toFixed(2);
      }
    });
    product.save();
    res.json({ product });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

//Edit a review
router.put("/review/:product_id/:review_id", auth, async (req, res) => {
  const { comment, rating } = req.body;
  try {
    let product = await Product.findById(req.params.product_id);
    product.reviews.map(review => {
      if (review._id.toString() === req.params.review_id) {
        review.comment = comment;
        product.avg_rating = (
          (product.avg_rating * product.reviews.length +
            (Number(rating) - review.rating)) /
          product.reviews.length
        ).toFixed(2);
        review.rating = rating;
      }
    });
    product.save();
    res.json({ product });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
});
module.exports = router;
