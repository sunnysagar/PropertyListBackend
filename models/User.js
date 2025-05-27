/**
 * Mongoose schema for User model.
 *
 * Represents a user with a name, unique email, and password.
 *
 * @typedef {Object} User
 * @property {string} name - The name of the user.
 * @property {string} email - The unique email address of the user.
 * @property {string} password - The user's password.
 */
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email :{type: String, unique: true},
    password: String
});

module.exports = mongoose.model("User", userSchema);