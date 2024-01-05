const mongoose = require("mongoose");

const userCredential = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

const Credential = mongoose.model("credential", userCredential);
module.exports = Credential;
