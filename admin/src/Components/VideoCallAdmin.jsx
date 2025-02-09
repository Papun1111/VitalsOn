// src/admin/VideoCallAdmin.jsx
import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:1111"; // Adjust if needed
const ROOM_ID = "abc"; // Hard-coded room for demo

export default function VideoCallAdmin() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const socketRef = useRef(null);

  // Configure ICE servers (add TURN servers here if needed)
  const iceServers = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

  useEffect(() => {
    // 1. Connect to the Socket.IO server
    socketRef.current = io(SOCKET_SERVER_URL, { transports: ["websocket"] });

    // 2. Get local media (camera and microphone)
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(async (localStream) => {
        // Display the local stream
        localVideoRef.current.srcObject = localStream;
        localVideoRef.current.muted = true; // Mute local video to avoid feedback

        // 3. Create the RTCPeerConnection after acquiring media
        peerConnectionRef.current = new RTCPeerConnection(iceServers);

        // 4. When a local ICE candidate is generated, send it to the server
        peerConnectionRef.current.onicecandidate = (event) => {
          if (event.candidate) {
            socketRef.current.emit("ice-candidate", {
              roomId: ROOM_ID,
              candidate: event.candidate,
            });
          }
        };

        // 5. When a remote track is received, display it in the remote video element
        peerConnectionRef.current.ontrack = (event) => {
          console.log("Admin: Remote stream received:", event.streams[0]);
          remoteVideoRef.current.srcObject = event.streams[0];
        };

        // 6. Add all local tracks to the RTCPeerConnection
        localStream.getTracks().forEach((track) => {
          peerConnectionRef.current.addTrack(track, localStream);
        });

        // 7. Join the designated room
        socketRef.current.emit("join-room", ROOM_ID);

        // 8. Listen for an "offer" from the User (caller)
        socketRef.current.on("offer", async ({ offer }) => {
          console.log("Admin: Received offer from User.");
          if (!peerConnectionRef.current) return;
          try {
            // Set the remote description with the received offer
            await peerConnectionRef.current.setRemoteDescription(
              new RTCSessionDescription(offer)
            );
            // Create an answer and set it as the local description
            const answer = await peerConnectionRef.current.createAnswer();
            await peerConnectionRef.current.setLocalDescription(answer);
            // Send the answer back to the User
            socketRef.current.emit("answer", { roomId: ROOM_ID, answer });
            console.log("Admin: Sent answer to User.");
          } catch (err) {
            console.error("Admin: Error handling offer:", err);
          }
        });

        // 9. Listen for ICE candidates from the User
        socketRef.current.on("ice-candidate", async ({ candidate }) => {
          console.log("Admin: Received ICE candidate:", candidate);
          if (!peerConnectionRef.current || !candidate) return;
          try {
            await peerConnectionRef.current.addIceCandidate(
              new RTCIceCandidate(candidate)
            );
          } catch (err) {
            console.error("Admin: Error adding ICE candidate:", err);
          }
        });
      })
      .catch((err) => {
        console.error("Admin: getUserMedia error:", err);
      });

    // Cleanup on component unmount
    return () => {
      if (peerConnectionRef.current) peerConnectionRef.current.close();
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Admin Video Call (Callee) – Room: {ROOM_ID}</h2>
      <div style={{ display: "flex", gap: "1rem" }}>
        <video
          ref={localVideoRef}
          style={{ width: "300px", backgroundColor: "black" }}
          autoPlay
          playsInline
          muted
        />
        <video
          ref={remoteVideoRef}
          style={{ width: "300px", backgroundColor: "black" }}
          autoPlay
          playsInline
        />
      </div>
    </div>
  );
}
