const express = require("express");
require("./Models/db");
require("dotenv").config();  // Add parentheses here
const cors = require("cors");
const port = process.env.PORT || 8020;

const app = express();
const bodyParser = require("body-parser");
const AuthRouter = require("./Routes/AuthRouter");

app.get("/", (req, res) => {
    res.send("Come To CRMi Dashboard !");
});

// Use body-parser to parse JSON requests
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Use the AuthRouter for '/auth' route
app.use('/auth', AuthRouter);

// Start the server on the specified port
app.listen(port, () => {
    console.log(`Server Run Successfully at PORT ${port} !`);
});
