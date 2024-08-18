const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    coverImage: { type: String },
    content: { type: String, required: true },
    author: { type: String },
    tags: [{ type: String }],
    publishedAt: { type: Date },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;
