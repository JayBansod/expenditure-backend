const express = require("express");
const router = express.Router();
const auth_controller = require("../controller/auth_controller");
const authMiddleWare = require("../middleware/authMiddleWare");

router.route("/register").post(auth_controller.register);
router.route("/login").post(auth_controller.login);
router.route("/user").get(authMiddleWare, auth_controller.user);

module.exports = router;
