const mongoose = require("mongoose");

const theaterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },
        isActive: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

const Theater = mongoose.mongoose.model("theater", theaterSchema);

module.exports = Theater;