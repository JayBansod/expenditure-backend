const mongoose = require("mongoose");

const userBank = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    bankName: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        default: "0",
    },
});

const bank_details = new mongoose.model("bankAccount", userBank);
module.exports = bank_details;
