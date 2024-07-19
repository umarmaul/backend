const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
	{
		event_level: {
			type: String,
			enum: ["low", "mid", "high"],
			default: "low",
		},
		event_type: {
			type: String,
		},
		event_picture: {
			type: String,
		},
		description: {
			type: String,
		},
		from_camera: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "cameras",
		},
		status: {
			type: String,
			enum: ["new", "on_progress", "done"],
			default: "new",
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

const Event = mongoose.model("events", eventSchema);
module.exports = Event;
