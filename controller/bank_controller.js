const express = require("express");
const bank_details = require("../modules/bank_detail");
const Transaction = require("../modules/transaction");

const addAccount = async (req, res) => {
    let success = false;
    try {
        const { userId, bankName, amount } = req.body;
        // console.log(req.body);
        const bankExist = await bank_details.find({ $and: [{ bankName: bankName }, { userId: userId }] });

        // console.log("bankexist", bankExist.length);
        if (bankExist.length > 0) {
            return res.status(400).json({ success, msg: "Bank Already exist" });
        }
        const userBank = await bank_details.create({ userId, bankName, amount });
        success = true;
        res.status(200).json({ success, msg: "Account created", userBank });
    } catch (error) {
        console.log(error);
    }
};

const showBanks = async (req, res) => {
    try {
        // console.log("show banks bank_controller", req.veri);
        let userId = req.veri.user.id;
        const response = await bank_details.find({ userId: userId });
        // console.log("bank controller show banks", response);
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
    }
};

const addTransaction = async (req, res) => {
    let success = false;
    var dateObj = new Date();
    var date = dateObj.getFullYear() + "-" + (dateObj.getMonth() + 1) + "-" + dateObj.getDate();
    var time = dateObj.toLocaleTimeString("en-US", { hour12: true });
    try {
        const { userId, from, to, amount, discription } = req.body;
        const response = await Transaction.create({ userId, from, to, amount, discription, date, time });
        success = true;
        res.status(200).json({ success, msg: "Transaction Added", response });
    } catch (error) {
        console.log(error);
    }
};

const getAccountBalance = async (req, res) => {
    try {
        const { userId, bankName } = req.body;
        const detail = await bank_details.find({ $and: [{ userId: userId }, { bankName: bankName }] });

        res.status(200).json(detail);
    } catch (error) {
        console.log(error);
    }
};
const updateAccountBalance = async (req, res) => {
    try {
        const { userId, from, amount, action } = req.body;
        // console.log("updateAccountBalance bank_controller.js", req.body);
        // console.log(userId, " ", from, " ", amount, " ", action, " ");
        if (action === "add") {
            const update = await bank_details.findOneAndUpdate({ userId: userId, bankName: from }, { $inc: { amount: amount } });
            res.status(200).json(update);
        } else if (action === "sub") {
            const update = await bank_details.findOneAndUpdate({ userId: userId, bankName: from }, { $inc: { amount: -amount } });
            res.status(200).json(update);
        }
    } catch (error) {
        console.log(error);
    }
};
//show all transction
const showAllTransction = async (req, res) => {
    try {
        let userId = req.veri.user.id;
        // console.log("showAlltransction bank_controller", userId);
        const allTransction = await Transaction.find({ userId: userId });
        // console.log(allTransction);
        res.status(200).json(allTransction);
    } catch (error) {
        console.log(error);
    }
};
// show current bank
const currBank = async (req, res) => {
    try {
        let id = req.params.id;
        const curr = await bank_details.findOne({ _id: id });
        // console.log(curr);
        res.status(200).json(curr);
    } catch (error) {
        console.log(error);
    }
};
// update bank
const updateBank = async (req, res) => {
    try {
        const id = req.params.id;
        const upadteUserData = req.body;
        // console.log("delete bank id", id);
        // console.log("user data ", upadteUserData);

        const curr = await bank_details.updateOne({ _id: id }, { $set: upadteUserData });
        res.status(200).json(curr.json);
    } catch (error) {
        console.log(error);
    }
};
// delete transaction
const deleteTransction = async (req, res) => {
    try {
        const id = req.params.id;
        // console.log("bank_controller.js => to display id to delete", req.params.id);
        const deleteTrans = await Transaction.deleteOne({ _id: id });
        res.status(200).json(deleteTrans);
    } catch (error) {
        console.log("bank_controller.js => to display error ", error);
    }
    // const id = req.params.id;
};
// delete bank account
const deleteBank = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteAccount = await bank_details.deleteOne({ _id: id });
        res.status(200).json(deleteAccount);
    } catch (error) {
        console.log(error);
    }
};
module.exports = {
    addAccount,
    showBanks,
    addTransaction,
    getAccountBalance,
    updateAccountBalance,
    showAllTransction,
    deleteTransction,
    deleteBank,
    currBank,
    updateBank,
};
