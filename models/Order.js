const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  orders: [
    {
      name: {
        type: String,
        required: true,
      },
      mobile: {
        type: String,
        required: true,
      },
      address: {
        line1: {
          type: String,
          required: true,
        },
        line2: {
          type: String,
          required: true,
        },
        zip_code: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
      },
      total: {
        type: Number,
        required: true,
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
      status: {
        type: String,
        default: "Confirmed",
      },
      date: {
        type: Date,
        default: new Date(),
      },
    },
  ],
});

module.exports = mongoose.model("Order", OrderSchema);
