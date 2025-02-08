require("./Models/db.js");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const AuthRouter = require("./Routes/AuthRouter.js");
const serverless = require("serverless-http");

dotenv.config(); // Initialize environment variables

const port = process.env.PORT || 8020;

const app = express();

app.use(bodyParser.json());
app.use(cors()); 
app.get("/", (req, res) => {
  res.send("Welcome to Smart Campus!");
});
app.use("/auth", AuthRouter);

const httpServer = app.listen(port, () => {
  console.log(`Server running successfully at PORT ${port}!`);
});

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

module.exports.handler = serverless(app);
module.exports = app;
