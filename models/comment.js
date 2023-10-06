const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
	{
		userInfo: {
            type: String,
            required: true,
        },
		comment: {
            type: String,
            required: true,
        },
		blogId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	}
);

module.exports = mongoose.model("User", commentSchema);
