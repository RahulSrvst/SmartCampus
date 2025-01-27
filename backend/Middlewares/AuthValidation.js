const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization; // Get the Authorization header

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized. No token provided.", success: false });
  }

  const token = authHeader.split(" ")[1]; // Extract the token after 'Bearer'
  if (!token) {
    return res.status(401).json({ message: "Unauthorized. Token format invalid.", success: false });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    // Attach user data (e.g., collegeId) to req for use in controllers
    req.user = { userId: decoded.userId, collegeId: decoded.collegeId };

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Unauthorized. Invalid token.", success: false });
  }
};

module.exports = authMiddleware;
