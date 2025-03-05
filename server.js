require('dotenv').config();
const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());




// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
