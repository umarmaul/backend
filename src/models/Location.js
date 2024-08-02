const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: "Location",
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
            default: "No Description",
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
