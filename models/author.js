const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  blogs: [{ type: Schema.Types.ObjectId, ref: "Blog", default: [] }],
});

module.exports = mongoose.model("Author", authorSchema);
