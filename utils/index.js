const generateResponse = (data, isError = false) => {
  return {
    success: !isError,
    data,
  };
};
const bcrypt = require("bcryptjs");
const { SALT_ROUNDS } = require("../config/config");

const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });
};

module.exports = {
  generateResponse,
  hashPassword,
  comparePassword,
  generateToken,
};
