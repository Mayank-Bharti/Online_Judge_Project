// hashUtils.js
const bcrypt = require('bcryptjs');

async function hashPassword(password) {
    const saltRounds = 10; // Cost factor controls how much time is needed to calculate a single bcrypt hash.
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Hashing error:', error);
        throw error; // Throw error to handle it in the caller function
    }
}

async function verifyPassword(userPassword, hashedPassword) {
    try {
        const isMatch = await bcrypt.compare(userPassword, hashedPassword);
        return isMatch; // true if the password matches, false otherwise
    } catch (error) {
        console.error('Verification error:', error);
        throw error; // Throw error to handle it in the caller function
    }
}

module.exports = { hashPassword, verifyPassword };
