const express = require("express");
const { register, login } = require("../controllers/authControllers");
const {
  validateLogin,
  validateRegister,
} = require("../middleware/AuthValidator");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

module.exports = router;
