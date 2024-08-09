const mongoose = require("mongoose");
const Location = require("./Location");

const deviceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: "device",
        },
        ip_address: {
            type: String || Number,
            default: "127.0.0.1",
        },
        identifier: {
            type: String,
            default: "device identifier",
        },
        specification: {
            type: String,
            default: "device specification",
        },
        type: {
            type: String,
            default: "device type",
        },
        from_location: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Location,
            default: null,
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

const Device = mongoose.model("devices", deviceSchema);
module.exports = Device;
