/**
 * Handles user signup requests.
 * Calls the signupService with the request body to create a new user.
 * Responds with status 201 and a success message on success,
 * or status 500 and an error message on failure.
 *
 */

/**
 * Handles user login requests.
 * Calls the loginService with the request body to authenticate the user.
 * Responds with a JWT token on success,
 * or status 400 and an error message on failure.
 *
 */
const { signupService, loginService} = require("../services/authService");

exports.signup = async (req, res) => {
  
  try {
    await signupService(req.body);
    res.status(201).json({message: "User Created"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

exports.login = async (req, res) => {
  try {
    const token = await loginService(req.body);
    res.json({token});
  } catch (error) {
    res.status(400).json({message: error.message });
  }
};
