const { getDB } = require("../config/db");
require("dotenv").config();

const {
  hashPassword,
  comparePassword,
  generateToken,
} = require("../utils/index");

const registerUser = async (user) => {
  const db = getDB();
  const usersCollection = db.collection("users");

  const existingUser = await usersCollection.findOne({ email: user.email });
  if (existingUser) throw new Error("User already exists!");

  user.password = await hashPassword(user.password);
  user.createdAt = new Date();

  const result = await usersCollection.insertOne(user);
  return result.insertedId;
};

const loginUser = async (email, password) => {
  const db = getDB();
  if (!db) {
    throw new Error("Database connection failed");
  }
  const usersCollection = db.collection("users");

  const user = await usersCollection.findOne({ email });
  if (!user) throw new Error("User not found!");

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials!");

  return generateToken(user);
};

module.exports = { registerUser, loginUser };
