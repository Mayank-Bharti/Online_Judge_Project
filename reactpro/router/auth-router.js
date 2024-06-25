//npm view react version

const express = require("express");
const router = express.Router();
const authcontrol = require("../Controllers/auth-controller");

router.route("/").get(authcontrol.home);
router.route("/register").post(authcontrol.register);
router.route("/login").post(authcontrol.login);


module.exports = router; 





