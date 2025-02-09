// src/components/VideoCall.jsx
import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:1111"; // Adjust if needed
const ROOM_ID = "abc"; // Hard-coded room for demo

export default function VideoCall() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const socketRef = useRef(null);

  // Configure ICE servers (add TURN servers here if needed)
  const iceServers = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

  useEffect(() => {
    // 1. Connect to the Socket.IO server
    socketRef.current = io(SOCKET_SERVER_URL, { transports: ["websocket"] });

    // 2. Create the RTCPeerConnection
    peerConnectionRef.current = new RTCPeerConnection(iceServers);

    // 3. When a local ICE candidate is generated, send it to the server
    peerConnectionRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit("ice-candidate", {
          roomId: ROOM_ID,
          candidate: event.candidate,
        });
      }
    };

    // 4. When a remote track is received, display it in the remote video element
    peerConnectionRef.current.ontrack = (event) => {
      console.log("User: Remote stream received:", event.streams[0]);
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    // 5. Join the designated room
    socketRef.current.emit("join-room", ROOM_ID);

    // 6. Listen for an "answer" from the Admin (callee)
    socketRef.current.on("answer", async ({ answer }) => {
      console.log("User: Received answer:", answer);
      if (!peerConnectionRef.current) return;
      try {
        await peerConnectionRef.current.setRemoteDescription(
          new RTCSessionDescription(answer)
        );
      } catch (err) {
        console.error("User: Error setting remote description:", err);
      }
    });

    // 7. Listen for ICE candidates from the Admin
    socketRef.current.on("ice-candidate", async ({ candidate }) => {
      console.log("User: Received ICE candidate:", candidate);
      if (!peerConnectionRef.current || !candidate) return;
      try {
        await peerConnectionRef.current.addIceCandidate(
          new RTCIceCandidate(candidate)
        );
      } catch (err) {
        console.error("User: Error adding ICE candidate:", err);
      }
    });

    // 8. Get local media (camera and microphone)
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(async (stream) => {
        // Display the local stream
        localVideoRef.current.srcObject = stream;
        localVideoRef.current.muted = true; // Mute local video to avoid feedback

        // Add all local tracks to the RTCPeerConnection
        stream.getTracks().forEach((track) => {
          peerConnectionRef.current.addTrack(track, stream);
        });

        // 9. Create an offer and send it immediately to the Admin
        const offer = await peerConnectionRef.current.createOffer();
        await peerConnectionRef.current.setLocalDescription(offer);
        console.log("User: Sending offer to Admin...", offer);
        socketRef.current.emit("offer", { roomId: ROOM_ID, offer });
      })
      .catch((err) => {
        console.error("User: getUserMedia error:", err);
      });

    // Cleanup on component unmount
    return () => {
      if (peerConnectionRef.current) peerConnectionRef.current.close();
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>User Video Call (Caller) – Room: {ROOM_ID}</h2>
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
