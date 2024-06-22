//npm view react version

const express = require("express");
const router = express.Router();
const authcontrol = require("../Controllers/auth-controller");

router.route("/").get(authcontrol.home);
router.route("/register").post(authcontrol.register);

module.exports = router;





