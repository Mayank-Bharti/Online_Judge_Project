const mongoose = require("mongoose");
const { hashPassword } = require('../utils/hashutils');
const jwt = require('jsonwebtoken');

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
    profilepic: {
        type: Buffer,
    },
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
    }
});

userSchema.pre("save", async function(next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    try {
        const hashedPassword = await hashPassword(user.password);
        user.password = hashedPassword;
        next();
    } catch (error) {
        return next(error); // Pass error to the next middleware or error handler
    }
});

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
