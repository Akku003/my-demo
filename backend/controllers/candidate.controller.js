const pool = require("../db");
/**
 * GET LOGGED-IN CANDIDATE PROFILE
 */
exports.getCandidateProfile = async (req, res) => {
    try {
        // req.user comes from JWT middleware
        const userId = req.user.id;
        const role = req.user.role;

        // Extra safety check
        if (role !== "candidate") {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        const result = await pool.query(
            `
      SELECT 
        u.email,
        c.register_number,
        c.f_name,
        c.m_name,
        c.l_name,
        c.branch,
        c.cgpa,
        c.backlogs,
        c.academic_year
      FROM users u
      JOIN candidate_profiles c
        ON u.id = c.user_id
      WHERE u.id = $1
      `,
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Candidate profile not found"
            });
        }

        return res.json(result.rows[0]);

    } catch (error) {
        console.error("GET CANDIDATE PROFILE ERROR:", error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};

/**
 * UPDATE LOGGED-IN CANDIDATE PROFILE
 */
exports.updateCandidateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    if (role !== "candidate") {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    const {
      branch,
      cgpa,
      backlogs,
      academic_year
    } = req.body;

    // Basic validation
    if (
      branch === undefined ||
      cgpa === undefined ||
      backlogs === undefined ||
      academic_year === undefined
    ) {
      return res.status(400).json({
        message: "All profile fields are required"
      });
    }

    if (cgpa < 0 || cgpa > 10) {
      return res.status(400).json({
        message: "CGPA must be between 0 and 10"
      });
    }

    if (backlogs < 0) {
      return res.status(400).json({
        message: "Backlogs cannot be negative"
      });
    }

    await pool.query(
      `
      UPDATE candidate_profiles
      SET
        branch = $1,
        cgpa = $2,
        backlogs = $3,
        academic_year = $4
      WHERE user_id = $5
      `,
      [branch, cgpa, backlogs, academic_year, userId]
    );

    return res.json({
      message: "Candidate profile updated successfully"
    });

  } catch (error) {
    console.error("UPDATE CANDIDATE PROFILE ERROR:", error);
    return res.status(500).json({
      message: "Server error"
    });
  }
};
