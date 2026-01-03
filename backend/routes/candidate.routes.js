const express = require("express");
const router = express.Router();

const {
    requireAuth,
    requireCandidate
} = require("../middleware/auth.middleware");

const candidateController = require("../controllers/candidate.controller");

// GET candidate profile
router.get(
    "/profile",
    requireAuth,
    requireCandidate,
    candidateController.getCandidateProfile
);
router.put(
  "/profile",
  requireAuth,
  requireCandidate,
  candidateController.updateCandidateProfile
);

module.exports = router;
