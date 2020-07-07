const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      cost: {
        type: Number,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Cart", CartSchema);
