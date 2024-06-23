const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
	{
		name: {
			type: String,
		},
		supervisor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
		},
		operator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
		},
		description: {
			type: String,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		updatedAt: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

const Location = mongoose.model("locations", locationSchema);
module.exports = Location;
