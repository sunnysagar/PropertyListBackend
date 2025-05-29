/**
 * Registers a new user with hashed password.
 * @param {Object} params - User details.
 * @returns {Promise<void>}
 */

/**
 * Authenticates user and returns JWT token.
 * @param {Object} params - Login details.
 * @returns {Promise<string>}
 */
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// Create New user
exports.signupService = async({name, userType, email, password}) => {
    const hashed = await bcrypt.hash(password, 10);
    await User.create({name, userType, email, password:hashed});
    
};

// Login 
exports.loginService = async({email, password}) => {
    const user = await User.findOne({email});
    if(!user)
        throw new Error("Invalid Credentials")

    const match = await bcrypt.compare(password, user.password);
    if(!match)
        throw new Error("Invalid Credentials");

    const token = await jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET);
    return token;
}