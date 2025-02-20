
// require('dotenv').config();
// const jwt = require('jsonwebtoken');


// const authMiddleware = (req, res, next) => {
//     const token = req.header('Authorization');
//     if (!token) {
//         return res.status(401).json({ error: 'Access Denied!' });
//     }

//     try {

//         console.log("Token received:", token);  // Log the token to check its value
         
        
//         // Split the token correctly (to remove "Bearer " part)
//         const tokenValue = token.split(' ')[1]; 
//         console.log(`token recoved after split:`, tokenValue);  // Log the actual token value

//         // Use the same secret as the one used when signing the token means Verify the token with the secret key
//         const verified = jwt.verify(tokenValue, process.env.JWT_SECRET); 
//         console.log("Token verified:", verified);

//          // Attach user information from token to the request object
//          req.user = verified.id;
//          next(); // Pass control to the next middleware/route handler
//     } catch (error) {
//         console.error("Error in token verification:", error);  // Log the error for debugging
//         res.status(400).json({ error: 'Invalid Token!' });
//     }
// };

// module.exports = authMiddleware;

const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token = req.header("Authorization");

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }

  try {
    token = token.split(" ")[1]; // Extract the actual token
    console.log(`Extracted Token:`, token); // Debugging log
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = { protect };
