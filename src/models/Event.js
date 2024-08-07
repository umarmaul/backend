const mongoose = require("mongoose");
const Camera = require("./Camera");

const eventSchema = new mongoose.Schema(
    {
        event_level: {
            type: String,
            default: "low",
        },
        event_type: {
            type: String,
            default: "event",
        },
        event_picture: {
            type: String,
            default: "no picture",
        },
        description: {
            type: String,
            default: "no description",
        },
        from_camera: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Camera,
            default: null,
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
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const Event = mongoose.model("events", eventSchema);
module.exports = Event;
