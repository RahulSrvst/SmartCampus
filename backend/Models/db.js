const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGO_CONN;

mongoose.connect(uri)
    .then(() => {
        console.log("MongoDB Connected Successfully!");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
