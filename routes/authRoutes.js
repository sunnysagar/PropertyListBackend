/**
 * Auth Routes
 * 
 * This module defines authentication-related routes for user signup and login.
 * 
 * @module routes/authRoutes
 * @requires express
 * @requires ../controllers/authController
 * 
 * @route POST /signup - Registers a new user.
 * @route POST /login - Authenticates a user and returns a token.
 */
const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
