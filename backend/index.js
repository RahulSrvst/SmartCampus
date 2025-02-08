require("../Models/db.js");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to Smart Campus!");
});

const AuthRouter = require("../Routes/AuthRouter.js");
app.use("/auth", AuthRouter);

module.exports = app;
module.exports.handler = serverless(app);
