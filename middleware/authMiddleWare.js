const jwt = require("jsonwebtoken");
const JWT_SECRET = "JayISGoodB$oy";
const Credential = require("../modules/Credential");

const authMiddleWare = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ msg: "Token not exist" });
    }
    try {
        const verified = jwt.verify(token, JWT_SECRET);
        // console.log("verified", verified);
        const data = await Credential.find({ email: verified.user.email }).select({ password: 0 });
        // console.log("authmiddleware", data);
        req.user = data[0];
        req.veri = verified;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized, invalid Token", error });
    }
};
module.exports = authMiddleWare;
