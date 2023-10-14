const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  like: {
    type: Number,
    default: 0,
    required: true,
  },
  view: {
    type: Number,
    default: 0,
    required: true,
  },
  author: [
    {
      type: Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
  ],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Blog", blogSchema);
