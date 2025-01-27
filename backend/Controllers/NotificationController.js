const express = require('express');
const http = require('http'); // Required for integrating with Socket.IO
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const Notification = require('../Models/Notification'); // Assuming you have a Notification model

const app = express();
const server = http.createServer(app); // Wrap express app with HTTP server
const io = new Server(server, {
  cors: {
    origin: "*", // Replace with your frontend URL for security
  },
});

// Listen for client connections
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const sendNotification = (notification, recipient) => {
  console.log(`Sending notification: ${notification}, Recipient: ${recipient}`);
  if (recipient) {
    io.to(recipient).emit("newNotification", notification); // Send to specific user
  } else {
    io.emit("newNotification", notification); // Send to all users
  }
};


// Add notification logic with real-time updates
const addNotification = async (req, res) => {
  try {
    console.log("req.io:", req.io); // Check if req.io is accessible here

    const { title, message, link, recipient, isGlobal, recipientType } = req.body;

    const newNotification = new Notification({
      title,
      message,
      link,
      recipient: isGlobal ? null : recipient,
      isGlobal,
      recipientType,
    });

    await newNotification.save();

    console.log("Emitting newNotification event with data:", newNotification);

    // Emit the event
    req.io.emit("newNotification", newNotification);

    return res.status(201).json({ message: "Notification added successfully!" });
  } catch (err) {
    console.error("Error adding notification:", err);
    return res.status(500).json({ message: "Error adding notification." });
  }
};




module.exports = {addNotification,sendNotification};