/**
 * Express middleware to authenticate requests using JWT.
 *
 * Checks for the presence of an Authorization header, verifies the JWT token,
 * and attaches the decoded user information to the request object.
 * If the token is missing or invalid, responds with a 401 Unauthorized error.
 */

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).json({message: "No token provided"});

    const token = authHeader.split(" ")[1];
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(err){
        return res.status(401).json({message: "Invalid token", err});
    }
}; 