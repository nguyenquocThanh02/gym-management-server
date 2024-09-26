const mongoose = require("mongoose");

const registerTracking = new mongoose.Schema(
  {
    package: {
      price: { type: Number },
      name: { type: String },
      idPackage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Package",
        required: true,
      },
    },
    user: {
      fullName: { type: String },
      email: { type: String },
      phone: { type: String },
      idUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    discount: {
      priceDescrease: { type: Number },
      idDiscount: [{ type: mongoose.Schema.Types.ObjectId, ref: "Discount" }],
    },
    payment: {
      payerName: { type: String },
      payerEmail: { type: String },
      payerId: { type: String },
      orderId: { type: String },
    },
    paidAt: { type: Date },
    paymentMethod: { type: String },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    timeStart: { type: Date, required: true },
    timeEnd: { type: Date, required: true },
    status: { type: String, enum: ["active", "cancel"], default: "active" },
  },
  {
    timestamps: true,
  }
);
const RegisterTracking = mongoose.model("RegisterTracking", registerTracking);
module.exports = RegisterTracking;
