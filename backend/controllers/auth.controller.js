const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * REGISTER CONTROLLER
 */
exports.register = async (req, res) => {
  try {
    const { email, password, role, register_number } = req.body;

    //1.Basic validation
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!["candidate", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    //2.Candidate-specific validation
    if (role === "candidate") {
      if (!register_number) {
        return res.status(400).json({ message: "Register number is required" });
      }

      if (!register_number.startsWith("LBT")) {
        return res.status(400).json({
          message: "Register number must start with LBT",
        });
      }
    }

    //3.Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    //4.Insert into users table
    const userResult = await pool.query(
      `INSERT INTO users (email, password_hash, role)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [email, passwordHash, role]
    );

    const userId = userResult.rows[0].id;

    //5.Insert candidate profile if needed
    if (role === "candidate") {
      await pool.query(
        `INSERT INTO candidate_profiles (user_id, register_number)
         VALUES ($1, $2)`,
        [userId, register_number]
      );
    }

    //6.Success response
    return res.status(201).json({
      message: "Registration successful",
    });
  } catch (error) {
    // Email or register number already exists
    if (error.code === "23505") {
      return res.status(400).json({
        message: "Email or register number already exists",
      });
    }

    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * LOGIN CONTROLLER
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //1.Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    //2.Find user by email
    const userResult = await pool.query(
      "SELECT id, password_hash, role FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = userResult.rows[0];

    //3.Compare password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //4.Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    //5.Send response
    return res.json({
      message: "Login successful",
      token,
      role: user.role
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};