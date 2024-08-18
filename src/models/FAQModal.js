const mongoose = require("mongoose");

const FAQSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: { type: String },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

const FAQ = mongoose.model("FAQ", FAQSchema);
module.exports = FAQ;
