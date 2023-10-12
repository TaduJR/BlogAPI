const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  userInfo: {
    type: String,
    required: true,
  },
  userComment: {
    type: Array,
    required: true,
    default: [],
  },
  blogId: {
    type: Schema.Types.ObjectId,
    ref: "Blog",
    required: true,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
