const { text } = require("body-parser");
const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    coverImage: { type: String },
    content: { type: String, required: true },
    discription: { type: String },
    author: {
      name: { type: String },
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    status: {
      type: String,
      enum: ["draft", "reviewing", "published"],
      default: "reviewing",
    },
  },
  {
    timestamps: true,
  }
);

const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;
