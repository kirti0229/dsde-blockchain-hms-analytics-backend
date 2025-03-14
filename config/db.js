const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI);

async function connectDB() {
    try {
        await client.connect();
        console.log("✅ MongoDB Connected...");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed!", error);
        process.exit(1); // Exit if DB connection fails
    }
}

const db = client.db("blockchainDB"); // Database Name

module.exports = { client, db, connectDB };
