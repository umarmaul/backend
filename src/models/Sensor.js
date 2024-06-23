const { name } = require("ejs");
const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema(
	{
		name: {
			type: String,
		},
		temperature: {
			type: Number,
		},
		humidity: {
			type: Number,
		},
		human_presence: {
			type: Boolean,
		},
		AQI: {
			type: Number,
		},
		from_location: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "locations",
		},
		status: {
			type: String,
			enum: ["active", "inactive"],
			default: "active",
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

const Sensor = mongoose.model("sensors", sensorSchema);
module.exports = Sensor;
