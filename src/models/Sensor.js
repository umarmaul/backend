const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: "Sensor",
        },
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
        from_location: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "locations",
        },
        status: {
            type: String,
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
