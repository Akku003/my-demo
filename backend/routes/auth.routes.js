const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const {
  requireAuth,
  requireAdmin,
  requireCandidate
} = require("../middleware/auth.middleware");

// Register route
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/protected", requireAuth, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user
  });
});

router.get(
  "/admin-only",
  requireAuth,
  requireAdmin,
  (req, res) => {
    res.json({ message: "Admin access granted" });
  }
);

router.get(
  "/candidate-only",
  requireAuth,
  requireCandidate,
  (req, res) => {
    res.json({ message: "Candidate access granted" });
  }
);
module.exports = router;
