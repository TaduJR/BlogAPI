const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    fullname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	posts: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
});

module.exports = mongoose.model("Author", authorSchema);
