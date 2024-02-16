const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    blogId: {
      type: Schema.Types.ObjectId,
      ref: 'blog',
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
  },
  { timestamps: true }
);

const Comment = model("comment", schema);

module.exports = Comment;
