// controllers/auth-controller.js

const { generateFile } = require('../utils/generateFile');
const { executeCpp } = require('../utils/executeCpp');
const User = require('../models/user-model.js');
const jwt = require('jsonwebtoken');

// Example DSA problems
const problemDetails = {
    1: { title: 'Two Sum', description: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.', compiler: '...' },
    2: { title: 'Reverse Linked List', description: 'Reverse a singly linked list.', compiler: '...' },
    3: { title: 'Binary Tree Inorder Traversal', description: 'Given a binary tree, return the inorder traversal of its nodes\' values.', compiler: '...' },
    4: { title: 'Sum a and b', description: 'Sum of two numbers', compiler: '...' },
};

// Problem detail logic
exports.problemDetail = async (req, res) => {
    try {
        const problemId = req.params.id;
        const problem = problemDetails[problemId];

        if (problem) {
            res.json(problem);
        } else {
            res.status(404).json({ message: 'Problem not found' });
        }
    } catch (error) {
        console.log(error);
    }
};

// Home logic
const problems = [
    { id: 1, title: 'Two Sum' },
    { id: 2, title: 'Reverse Linked List' },
    { id: 3, title: 'Binary Tree Inorder Traversal' },
    {id: 4, title: 'Sum of two numbers'}
];

exports.home = async (req, res) => {
    try {
        res.json(problems);
    } catch (error) {
        console.log(error);
    }
};

// Registration logic
exports.register = async (req, res) => {
    try {
        const { username, email, password, dob, organisation } = req.body;
        if (!username || !email || !password || !dob || !organisation) {
            return res.status(400).json({ message: 'Name is required, Email is required, Password is required, dob is required, organisation is required' });
        }

        // Check if user with the same email or username already exists
        const userExist1 = await User.findOne({ email });
        const userExist2 = await User.findOne({ username });
        if (userExist1 || userExist2) {
            return res.status(400).json({ message: "Email or username already exists" });
        }

        // Create new user instance
        const newUser = new User({
            username,
            email,
            password,
            dob,
            organisation
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
            username: userCreated.username,
            isAdmin: userCreated.isAdmin,
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Login logic
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if both username and password are provided
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        // Find user by username
        const userExist = await User.findOne({ username });

        if (!userExist) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Match the password
        const isMatch = await userExist.verifyPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Username or password is incorrect" });
        }

        // Generate token
        const token = await userExist.generateToken();

        // Store cookies
        const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        // Send token
        res.status(200).cookie("token", token, options).json({
            message: "Login Successful",
            token: token,
            userId: userExist._id.toString(),
            username: userExist.username,
            isAdmin: userExist.isAdmin
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Compile code logic
exports.compileCode = async (req, res) => {
    const { language = 'cpp', code } = req.body;
    //    res.send({language,code});
    if (code === undefined) {
        return res.status(404).json({ success: false, error: "Empty code!" });
    }
    try {
        const filePath = await generateFile(language, code);
        const output = await executeCpp(filePath);
        res.send({ filePath ,output});
    } catch (error) {
        res.status(500).json({ success:false,message:"Error" ,error });
    }
};
