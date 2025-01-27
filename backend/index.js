import express from "express";
import "./Models/db.js"; // Database connection
import dotenv from "dotenv"; // Load .env variables
import cors from "cors";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import AuthRouter from "./Routes/AuthRouter.js";

dotenv.config(); // Initialize environment variables

const port = process.env.PORT || 8020;

const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to CRMi Dashboard!");
});
app.use("/auth", AuthRouter); // Use AuthRouter for authentication

// Start the HTTP server
const httpServer = app.listen(port, () => {
  console.log(`Server running successfully at PORT ${port}!`);
});

// Initialize Socket.IO
// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"],
  },
});


// Make Socket.IO available in requests
app.use((req, res, next) => {
  req.io = io;
  next();
});


io.on("connection", (socket) => {
  console.log("A user connected:", socket.id); // Add this log to confirm connections
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

