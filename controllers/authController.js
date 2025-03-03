const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const SecretKey = require('../models/SecretKey');

// User Registration
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// User Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ success: false, message: 'Invalid email or password' });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).json({ success: false, message: 'Invalid email or password' });

  // Store secret key in DB (Frontend will generate and send the number)
  const { secretNumber } = req.body; // Frontend sends the selected number
  await SecretKey.create({
    userId: user._id,
    secretNumber,
    expiresAt: new Date(Date.now() + 120 * 1000), // Expires in 2 minutes
  });

  // Generate JWT
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ success: true, token });
};

// Verify Secret Number
exports.verifyNumber = async (req, res) => {
  const { userId, selectedNumber } = req.body;

  let secretKey = await SecretKey.findOne({ userId });
  if (!secretKey || new Date() > new Date(secretKey.expiresAt)) {
    return res.status(400).json({ success: false, message: 'Secret number expired' });
  }

  if (secretKey.secretNumber !== selectedNumber) {
    return res.status(400).json({ success: false, message: 'Incorrect number' });
  }

  // Remove secret key after success
  await SecretKey.deleteOne({ userId });

  res.json({ success: true, message: "Number verified successfully" });
};
