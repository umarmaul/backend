const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        event_level: {
            type: String,
            default: "low",
        },
        event_type: {
            type: String,
            default: "normal",
        },
        event_picture: {
            type: String,
            default: "no image",
        },
        description: {
            type: String,
            default: "No Description",
        },
        from_camera: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "cameras",
        },
        status: {
            type: String,
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
