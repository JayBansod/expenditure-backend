const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    amount: { type: Number, required: true },
    discription: { type: String, required: true },
    date: { type: String },
    time: { type: String },
});

const Transaction = new mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
