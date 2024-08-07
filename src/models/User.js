const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: "user",
        },
        username: {
            type: String,
            default: "user",
        },
        email: {
            type: String,
            default: "user@example.com",
        },
        password: {
            type: String,
            default: "user",
        },
        role: {
            type: String,
            default: "user",
        },
        profile_picture: {
            type: String,
            default: "no picture",
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
        timestamps: true, // This will automatically add createdAt and updatedAt fields
    }
);

// Pre-save hook untuk hash password sebelum disimpan ke database
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method untuk memverifikasi password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("users", userSchema);
module.exports = User;
