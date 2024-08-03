const dotenv = require("dotenv").config(); // Use 'dotenv' instead of 'dot'
const express = require("express");
const path = require("path");
const cors = require("cors");
const router = require("../router/auth-router.js");
const connectDb = require("../utils/db.js");
const bodyParser = require("body-parser");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

// CORS Options
const corsOptions = {
    origin: " https://codemania-b1360.web.app",
    methods: "GET,POST,DELETE,PUT,PATCH,HEAD",
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', router); // Base route

const port = process.env.PORT || 5000;

connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at port ${port}`);
    });
}).catch(err => {
    console.error("Failed to connect to the database", err);
    process.exit(1);
});

