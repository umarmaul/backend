const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
    {
        report_type: {
            type: String,
            default: "normal",
        },
        reporter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        reported_to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "events",
        },
        events: {
            type: String,
            default: "No Description",
        },
        status: {
            type: String,
            default: "new",
        },
        report_file: {
            type: String,
            default: "no file",
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

const Report = mongoose.model("reports", reportSchema);
module.exports = Report;
