const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./config/db");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const dataRoutes = require("./routes/dataRoutes");
app.use("/api", dataRoutes);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB first, then start the server
connectDB().then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch(error => {
    console.error("❌ Server failed to start:", error);
});
