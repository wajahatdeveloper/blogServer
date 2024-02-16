const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    coverImageURL: {
      type: String,
      default: "/images/defaultCoverImage.png",
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
  },
  { timestamps: true }
);

const Blog = model("blog", schema);

module.exports = Blog;
