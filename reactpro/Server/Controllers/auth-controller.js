// controllers/auth-controller.js

const { generateFile } = require('../utils/generateFile');
const { executeCpp } = require('../utils/executeCpp');
const User = require('../models/user-model.js');
const Problem = require('../models/problem-model.js'); 
const ProblemDetail = require('../models/problem_detail');
const Contest = require('../models/contest_schema')
const jwt = require('jsonwebtoken');
const { executePy } = require('../utils/executePy.js');

//profile page
exports.profile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
            .populate('problemsSolved.problemId', 'title description difficulty')
            .populate('contestsParticipated.contestId', 'title description date')
            .exec();

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const totalUsers = await User.countDocuments();
        const totalContests = await Contest.countDocuments();
        const recentSubmissions = user.problemsSolved.slice(-5).map(ps => ({
            problem: ps.problemId,
            solvedAt: ps.solvedAt
        }));
        const userProfile = {
            username: user.username,
            email: user.email,
            dob: user.dob,
            organisation: user.organisation,
            created_at: user.created_at,
            updated_at: user.updated_at,
            isAdmin: user.isAdmin,
            problemsSolved: user.problemsSolved.map(ps => ({
                problem: ps.problemId.title,
                solvedAt: ps.solvedAt,
                difficulty: ps.problemId.difficulty
            })),
            contestsParticipated: user.contestsParticipated.map(cp => ({
                contest: cp.contestId.title,
                date: cp.contestId.date,
                result: cp.result
            })),
            communityStats: {
                totalUsers,
                totalContests
            },
            languages: user.languages || [],  
            skills: user.skills || [],       
            recentSubmissions: recentSubmissions
        };
        res.status(200).json({ user: userProfile });
    } catch (error) {
        console.error("Profile fetch error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
// Problem detail logic
exports.problemDetail = async (req, res) => {
    try {
        const problemTitle = req.params.title;
        const problem = await ProblemDetail.findOne({ title: problemTitle});

        if (problem) {
            res.json(problem);
        } else {
            res.status(404).json({ message: 'Problem not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Home logic
exports.home = async (req, res) => {
    try {
        const problems = await Problem.find({});
        const problemList = problems.map(problem => ({
            id: problem._id,
            type: problem.type,
            number: problem.number,
            problems: problem.problems.map(p => ({
                title: p.title,
            }))
        }));

        res.json(problemList);  

    } catch (error) {
        console.error('Error fetching problems:', error);
        res.status(500).send('Internal Server Error');
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
    // console.log(language);
    //    res.send({language,code});
    if (code === undefined) {
        return res.status(404).json({ success: false, error: "Empty code!" });
    }
    try {
        const filePath = await generateFile(language, code);
        let output;
        if(language=="cpp"){
            output = await executeCpp(filePath);
        }
        else{
            output = await executePy(filePath);
        }
        res.send({ filePath ,output});
    } catch (error) {
        res.status(500).json({ success:false,message:"Error" ,error });
    }
};