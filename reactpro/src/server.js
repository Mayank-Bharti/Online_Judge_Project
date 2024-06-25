const dot = require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const multer = require('multer');
const router = require("../router/auth-router.js");
const connectDb = require("../utils/db.js");
const User = require('../models/user-model.js');
const app = express();

// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

var corsOptions = {
    origin: 'http://localhost:5173', // Removed trailing slash
    methods: "GET,POST,DELETE,PUT,PATCH,HEAD", // Changed 'METHODS' to 'methods'
    credentials: true, // Changed 'Credential' to 'credentials'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", router);

const port = process.env.PORT || 3000;

connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at port ${port}`);
    });
}).catch(err => {
    console.error("Failed to connect to the database", err);
    process.exit(1);
});

