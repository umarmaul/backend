const mongoose = require("mongoose");
const User = require("./User");

const locationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: "location",
        },
        supervisor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
            default: null,
        },
        operator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
            default: null,
        },
        description: {
            type: String,
            default: "no description",
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

const Location = mongoose.model("locations", locationSchema);
module.exports = Location;
