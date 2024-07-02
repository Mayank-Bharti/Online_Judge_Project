//npm view react version

// routes/router.js
const express = require("express");
const router = express.Router();
const authControl = require("../controllers/auth-controller");
const validate = require("../middleware/validate_middle");
const signupSchema = require("../validators/auth-valid");

router.route("/").get(authControl.home);
router.route("/problemDetail/:id").get(authControl.problemDetail);
router.route("/register").post(validate(signupSchema), authControl.register);
router.route("/login").post(authControl.login);
router.route("/run").post(authControl.compileCode);

module.exports = router;
