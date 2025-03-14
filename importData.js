const { client } = require("./config/db"); // Import database connection
const fs = require("fs");
const path = require("path");

const importData = async () => {
    try {
        await client.connect(); // Ensure MongoDB is connected
        const db = client.db("blockchainDB"); // Your Database Name
        const InsuranceCollection = db.collection("Insurance"); // Correct Collection Name

        // Load JSON File
        const filePath = path.join(__dirname, "data", "Insurance_am.json");
        if (!fs.existsSync(filePath)) {
            console.log("❌ Insurance_am.json file not found!");
            process.exit(1);
        }

        const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
        if (!Array.isArray(data) || data.length === 0) {
            console.log("❌ No data found in Insurance_am.json");
            process.exit(0);
        }

        // Insert data into the correct collection
        await InsuranceCollection.insertMany(data);
        console.log("✅ Data imported successfully!");

        process.exit();
    } catch (error) {
        console.error("❌ Error importing data:", error);
        process.exit(1);
    }
};

importData();
