const mongoose = require("mongoose");

const DiscountSchema = new mongoose.Schema(
  {
    percent: { type: Number, required: true },
    description: { type: String, required: true },
    validFrom: { type: Date, required: true },
    validTo: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const Discount = mongoose.model("Discount", DiscountSchema);
module.exports = Discount;
