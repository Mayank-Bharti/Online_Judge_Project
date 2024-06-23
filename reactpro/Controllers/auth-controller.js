const User = require('../models/user-model.js');
const { hashPassword, verifyPassword } = require('../utils/hashutils');
const jwt = require('jsonwebtoken');

//home logic
const home = async (req, res) => {
    try {
        res.status(200).send("welcome");
    } catch (error) {
        console.log(error);
    }
};

//Registration logic

const register = async (req, res) => {
    try {
        const { username, email, password, dob, organisation, profilepic } = req.body;

        // Check if user with the same email already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password before saving
        const hashedPassword = await hashPassword(password);

        // Create new user instance
        const newUser = new User({
            username,
            email,
            password: hashedPassword, // Save hashed password
            dob,
            organisation,
            profilepic
        });

        // Save user to the database
        const userCreated = await newUser.save();

        // Generate token
        const token = await userCreated.generateToken();

        res.status(200).json({
            message: "Registration Successful",
            token: token,
            userId: userCreated._id.toString(),
            email: userCreated.email,
            isAdmin: userCreated.isAdmin,
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//login logic

const login = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if both username and email are provided
        if (!username || !email) {
            return res.status(400).json({ message: "Username and email are required" });
        }

        // Find user by both email and username
        const userExist = await User.findOne({ email, username });

        if (!userExist) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Verify password
        const isMatch = await verifyPassword(password, userExist.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email, username, or password" });
        }

        // Generate token
        const token = await userExist.generateToken();

        res.status(200).json({
            message: "Login Successful",
            token: token,
            userId: userExist._id.toString(),
            email: userExist.email,
            isAdmin: userExist.isAdmin
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
module.exports = { home, register,login};
