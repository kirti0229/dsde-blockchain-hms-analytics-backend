const express = require("express");
const { db } = require("../config/db"); // Import database connection
const router = express.Router();

router.get("/data", async (req, res) => {
    try {
        const collection = db.collection("Insurance"); // Correct Collection Name
        const data = await collection.find({}).toArray(); // Fetch all data

        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No data found in Insurance collection" });
        }

        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
