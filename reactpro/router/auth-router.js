//npm view react version

const express = require("express");
const router = express.Router();
const authcontrol = require("../Controllers/auth-controller");
const validate=require("../middleware/validate_middle");
const signupSchema=require("../validators/auth-valid");

const upload = require('../utils/upload.js');
const { uploadImage, getImage } = require('../Controllers/image-controller.js');
router.route("/").get(authcontrol.home);
router
.route("/register")
.post(validate(signupSchema),authcontrol.register);
router.route("/login").post(authcontrol.login);

router.post('/upload', upload.single('file'), uploadImage);
router.get('/File/:fileId', getImage);
module.exports = router; 





