const mongoose = require("mongoose");

const cameraSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: "Camera",
        },
        ip_address: {
            type: String || Number,
            default: "127.0.0.1",
        },
        identifier: {
            type: String,
            default: "Camera",
        },
        type: {
            type: String,
            default: "CCTV",
        },
        from_location: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "locations",
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

const Camera = mongoose.model("cameras", cameraSchema);
module.exports = Camera;
