const { db } = require("../config/db"); // Importing 'db' directly

const getAllUsers = async (req, res) => {
    try {
        const InsuranceCollection = db.collection("Insurance"); // Correct collection name

        const Insurance = await InsuranceCollection.find({}).toArray();
        res.status(200).json(Insurance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllUsers };
