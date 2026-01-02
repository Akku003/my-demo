const jwt = require("jsonwebtoken");

/**
 * AUTHENTICATION MIDDLEWARE
 * Verifies JWT token and attaches user info to request
 */
exports.requireAuth = (req, res, next) => {
  try {
    //1.Get Authorization header
    const authHeader = req.headers.authorization; 

    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    //2.Extract token (Bearer <token>) token prefix
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    //3.Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //4.Attach user info to request
    req.user = decoded;

    //5.Continue to route
    next(); //allows user to continue
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

/**
 * AUTHORIZATION: Admin only
 */
exports.requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

/**
 * AUTHORIZATION: Candidate only
 */
exports.requireCandidate = (req, res, next) => {
  if (req.user.role !== "candidate") {
    return res.status(403).json({ message: "Candidate access only" });
  }
  next();
};
