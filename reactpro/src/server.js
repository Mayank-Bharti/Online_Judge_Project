require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const router = require("../router/auth-router.js");
const connectDb = require("../utils/db.js");

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

