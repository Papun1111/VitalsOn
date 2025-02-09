// server.js
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectCloudinary from "./config/cloudinary.js";
import dbcall from "./config/db.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";
import http from "http";
import { Server } from "socket.io";

const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routers
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello from server");
});

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"], // Add your frontend URLs
    methods: ["GET", "POST"],
  },
});

// Socket.IO Connection Handling
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Handle room joining
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`Client ${socket.id} joined room ${roomId}`);
    // Notify room members of new participant
    io.to(roomId).emit("participant-joined", { socketId: socket.id });
  });

  // Handle offer relay
  socket.on("offer", ({ roomId, offer }) => {
    console.log(`Relaying offer in room ${roomId}`);
    socket.to(roomId).emit("offer", { offer });
  });

  // Handle answer relay
  socket.on("answer", ({ roomId, answer }) => {
    console.log(`Relaying answer in room ${roomId}`);
    socket.to(roomId).emit("answer", { answer });
  });

  // Handle ICE candidate relay
  socket.on("ice-candidate", ({ roomId, candidate }) => {
    console.log(`Relaying ICE candidate in room ${roomId}`);
    socket.to(roomId).emit("ice-candidate", { candidate });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    // You could emit a message to notify other participants
    io.emit("participant-left", { socketId: socket.id });
  });
});

// Start server
server.listen(port, () => {
  console.log("Server running on port", port);
  dbcall();
  connectCloudinary();
});