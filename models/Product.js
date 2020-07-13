const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  availability: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  reviews: [
    {
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  avg_rating: {
    type: Number,
    default: 0,
    required: true,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
