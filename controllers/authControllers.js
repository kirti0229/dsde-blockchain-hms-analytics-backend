const { registerUser, loginUser } = require("../services/authService");
const { generateResponse } = require("../utils");

const register = async (req, res) => {
  try {
    const userId = await registerUser(req.body);
    const responseObj = generateResponse(userId, false);
    res.status(201).json(responseObj);
  } catch (error) {
    const responseObj = generateResponse(error?.message, true);
    res.status(400).json(responseObj);
  }
};

// ✅ GET method for login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    res.setHeader("x-api-token", token);

    const responseObj = generateResponse(null, false);
    res.status(200).json(responseObj);
  } catch (error) {
    const responseObj = generateResponse(error?.message, true);
    res.status(400).json(responseObj);
  }
};

module.exports = { register, login };
