const mongoose = require("mongoose");
// const uri = "mongodb://localhost:27017/expenditure";
const uri = "mongodb+srv://expenditure:expenditure123@expenditure.xikxedj.mongodb.net/?retryWrites=true&w=majority";
const connectToDB = () => {
    try {
        mongoose.connect(uri);
        console.log("mongo connected");
    } catch (err) {
        console.log(err);
        process.exit();
    }
};

module.exports = connectToDB;
