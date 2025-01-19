const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Extract token from Authorization header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // If there's no token, deny access
  if (!token) {
    return res.status(403).json({
      message: "Access Denied. No token provided !!",
      success: false,
    });
  }

  try {
    // Verify token with the secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    // Attach the decoded user or college ID to the request object
    req.collegeId = decoded.collegeId; // Ensure that `collegeId` is encoded in the JWT

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({
      message: "Invalid or expired token.",
      success: false,
    });
  }
};

module.exports = verifyToken;
