const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          res.status(401).json({ message: "Token expired, please log in again" });
        } else {
          res.status(401).json({ message: "User is not authorized" });
        }
      } else {
        req.user = { 
          id: decoded.user.id, 
          email: decoded.user.email, 
          username: decoded.user.username, 
          role: decoded.user.role 
        }; // Attach the decoded payload to the request object
        next(); // Call next() to pass the request to the next middleware or route handler
      }
    });
  } else {
    res.status(401).json({ message: "User is not authorized or token is missing" });
  }
});

module.exports = validateToken;
