const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const File = require("./File"); 

const problemSchema = new mongoose.Schema({
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
        required: true,
    },
    solvedAt: {
        type: Date,
        default: Date.now,
    }
});

const contestSchema = new mongoose.Schema({
    contestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contest",
        required: true,
    },
    result: {
        type: String,
        required: true,
    },
    participatedAt: {
        type: Date,
        default: Date.now,
    }
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    organisation: {
        type: String,
        required: true,
    },
    // profilepic: {
    //     type: Buffer, 
    //     required: false,
    // },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    created_at: { 
        type: Date, 
        default: Date.now,
    },
    updated_at: { 
        type: Date, 
        default: Date.now,
    },
    problemsSolved: [problemSchema],
    contestsParticipated: [contestSchema]

});

userSchema.pre("save", async function(next) {
    const user = this;
    if (!user.isModified("password")) {
         next();
    }
    try {
        const saltRound=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(user.password,saltRound);
        user.password = hashPassword;
        // next();
    } catch (error) {
         next(error); // Pass error to the next middleware or error handler
    }
});

//compare password

userSchema.methods.verifyPassword=async function (password) {
   
    const isMatch = bcrypt.compare(password,this.password);
    return isMatch; 
}
// JWT generation method
userSchema.methods.generateToken = async function() {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "30d"
        });
    } catch (error) {
        console.error(error);
    }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
