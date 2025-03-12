const { generateResponse } = require("../utils/index");

const validateRegister = (req, res, next) => {
  let { name, email, password, role } = req.body;
  const errors = [];

  // Trim spaces
  name = name?.trim();
  email = email?.trim();

  // Name Validation
  if (!name || typeof name !== "string" || name.length < 2) {
    errors.push("Name must be at least 2 characters long.");
  }

  // Email Validation
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Invalid email format.");
  }

  // Password Validation
  if (
    !password ||
    password.length < 8 ||
    !/[A-Z]/.test(password) ||
    !/\d/.test(password) ||
    !/[!@#$%^&*(),.?":{}|<>]/.test(password)
  ) {
    errors.push(
      "Password must be at least 8 characters long, include one uppercase letter, one number, and one special character."
    );
  }

  // Role Validation (Optional but recommended)
  if (!role || !["admin", "user"].includes(role)) {
    errors.push("Invalid role. Role must be either 'admin' or 'user'.");
  }

  // If there are errors, return response
  if (errors.length > 0) {
    return res.status(400).json(generateResponse(errors, true));
  }

  next();
};

const validateLogin = (req, res, next) => {
  let { email, password } = req.body;
  const errors = [];

  // Trim spaces
  email = email?.trim();

  // Email Validation
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Invalid email format.");
  }

  // Password Validation
  if (!password || password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  }

  // If there are errors, return response
  if (errors.length > 0) {
    return res.status(400).json(generateResponse(errors, true));
  }

  next();
};

module.exports = { validateLogin, validateRegister };
