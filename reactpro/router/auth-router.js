//npm view react version

const express = require("express");
const router = express.Router();
const authcontrol = require("../Controllers/auth-controller");
const validate=require("../middleware/validate_middle");
const signupSchema=require("../validators/auth-valid");
router.route("/").get(authcontrol.home);
router
.route("/register")
.post(validate(signupSchema),authcontrol.register);
router.route("/login").post(authcontrol.login);


module.exports = router; 





