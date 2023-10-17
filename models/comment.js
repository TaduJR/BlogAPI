const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  blog: {
    type: Schema.Types.ObjectId,
    ref: "Blog",
    required: true,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
