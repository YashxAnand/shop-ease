const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const config = require("config");
const shortid = require("shortid");

var razorpay = new Razorpay({
  key_id: config.get("mkey"),
  key_secret: config.get("msecret"),
});

router.post("/", async (req, res) => {
  const payment_capture = 1;
  const { amount } = req.body;
  const currency = "INR";
  const options = {
    amount: amount.toString(),
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };
  try {
    const response = await razorpay.orders.create(options);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
