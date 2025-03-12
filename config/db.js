const { MongoClient } = require("mongodb");
const { DB_URI } = require("./config");

const client = new MongoClient(DB_URI);
let db;

const connectDB = async () => {
  try {
    await client.connect();
    db = client.db("hms"); // Change to your DB name
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  }
};

const getDB = () => db;

module.exports = { connectDB, getDB };
