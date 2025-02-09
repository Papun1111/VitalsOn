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

// Create HTTP server from the Express app
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    // Adjust to match your frontend URLs
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"],
  },
});

// === Socket.IO Signaling Logic ===
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Join a specific room
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  // Receive offer from caller -> broadcast to room
  socket.on("offer", ({ roomId, offer }) => {
    socket.to(roomId).emit("offer", { offer });
  });

  // Receive answer from callee -> broadcast to room
  socket.on("answer", ({ roomId, answer }) => {
    socket.to(roomId).emit("answer", { answer });
  });

  // ICE candidates
  socket.on("ice-candidate", ({ roomId, candidate }) => {
    socket.to(roomId).emit("ice-candidate", { candidate });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start the server
server.listen(port, () => {
  console.log("Server running on port", port);
  dbcall();
  connectCloudinary();
});
