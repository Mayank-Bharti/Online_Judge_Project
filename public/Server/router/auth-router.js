//npm view react version
//create a unique string : using concatenation with date and time as it is unique every time.. from this concept UUID module works
// routes/router.js
const express = require ("express");
const router = express.Router();
const authControl = require("../Controllers/auth-controller");
const validate = require("../middleware/validate_middle");
const signupSchema = require("../validators/auth-valid");
const authenticateJWT = require('../middleware/authenticateJWT');

router.route("/api").get(authControl.home);
router.route("/problemDetail/:title").get(authControl.problemDetail);
router.route("/register").post(validate(signupSchema), authControl.register);
router.route("/login").post(authControl.login);
router.route("/run").post(authenticateJWT,authControl.compileCode);
router.route('/profile').get(authenticateJWT, authControl.profile);
router.route("/submit-code").post(authenticateJWT,authControl.submit);

module.exports = router;
