const User = require('../models/user-model.js');
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
const jwt = require('jsonwebtoken');

//home logic
exports.home= async (req, res) => {
    try {
        res.json({message:"Welcome to the home page"});
    } catch (error) {
        console.log(error);
    }
};

//Registration logic

exports.register=('/register', async (req, res) => {
    try {
        const { username, email, password,dob, organisation } = req.body;
        if (!username || !email || !password || !dob || !organisation) {
            return res.status(400).json({ message: 'Name is required, Email is required, Password is required, dob is required, organisation is required' });
          }

        // Check if user with the same email already exists
        const userExist1 = await User.findOne({ email });
        const userExist2 = await User.findOne({ username });
        if (userExist1) {
            return res.status(400).json({ message: "Email or username already exists" });
        }
        if (userExist2) {
            return res.status(400).json({ message: "Email or username already exists" });
        }

        // Create new user instance
        const newUser = new User({
            username,
            email,
            password,
            dob,
            organisation,
            // profilepic, 
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
            // profilepic:userCreated.profilepic,
            username:userCreated.username,
            isAdmin: userCreated.isAdmin,
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//login logic

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
        // console.log(isMatch);
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

// module.exports = { home, register,login};
