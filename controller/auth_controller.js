const express = require("express");
const Credential = require("../modules/Credential");

//importing jwt token
var jwt = require("jsonwebtoken");
//for giving token
const JWT_SECRET = "JayISGoodB$oy";
//for password encription
const bcrypt = require("bcryptjs");

// +---------
// + register Logickahich nahi
// +---------
const register = async (req, res) => {
    try {
        let success = false;
        const { username, email, password } = req.body;
        // find the email already exist or not
        const user = await Credential.findOne({ email: email });
        if (user) {
            res.status(400).json({ success, msg: "email already exist" });
        }
        // add salt
        const salt = await bcrypt.genSalt(10);
        //hash the password
        const hashPassword = await bcrypt.hash(password, salt);
        // create the user
        const userCreated = await Credential.create({ username, email, password: hashPassword });

        // for jwt token
        const data = {
            user: {
                id: userCreated._id,
                email: userCreated.email,
                isAuthor: userCreated.isAuthor,
            },
        };
        const authToken = jwt.sign(data, JWT_SECRET);

        // send to user
        success = true;
        res.status(200).json({ success, msg: "registration successful", token: authToken, userId: userCreated._id });
    } catch (error) {
        console.log(error);
    }
};

// +---------
// + Login Logic
// +---------

const login = async (req, res) => {
    try {
        let success = false;
        // destructuring
        const { email, password } = req.body;
        // console.log(req.body);
        //checking for email exist or not
        const checkCredential = await Credential.findOne({ email: email });
        //email not exist
        if (!checkCredential) {
            return res.status(400).json({ success, msg: "Email incorrect" });
        }
        //comparing password
        const comparePassword = await bcrypt.compare(password, checkCredential.password);
        if (!comparePassword) {
            return res.status(400).json({ msg: "Password incorrect" });
        }
        const data = {
            user: {
                id: checkCredential._id,
                email: checkCredential.email,
            },
        };
        success = true;
        const authToken = jwt.sign(data, JWT_SECRET);
        res.status(200).json({ success, msg: "Successful login", token: authToken, userId: checkCredential._id });
    } catch (error) {
        console.log(error);
    }
};

// +---------
// + get user info Logic
// +---------
const user = (req, res) => {
    try {
        const userData = req.user;
        // console.log("auth_controller=>user ", userData);
        return res.status(200).json(userData);
    } catch (error) {
        console.log({ msg: error });
    }
};

module.exports = { register, login, user };
