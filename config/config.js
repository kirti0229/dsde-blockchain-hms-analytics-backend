require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 6000,
    DB_URI: process.env.DB_URI || "",  
    JWT_SECRET: process.env.JWT_SECRET || "default_secret",
    SALT_ROUNDS: 10,
};
