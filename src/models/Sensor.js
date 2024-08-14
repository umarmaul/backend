const mongoose = require("mongoose");
const Device = require("./Device");

const sensorSchema = new mongoose.Schema(
    {
        temperature: {
            type: Number,
            default: 0,
        },
        humidity: {
            type: Number,
            default: 0,
        },
        human_presence: {
            type: Boolean,
            default: false,
        },
        AQI: {
            type: Number,
            default: 0,
        },
        from_device: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Device,
            default: "66ad14cd8344ce01638f7b4a",
        },
        status: {
            type: String,
            default: "unassigned",
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

const Sensor = mongoose.model("sensors", sensorSchema);
module.exports = Sensor;
