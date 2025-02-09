// src/admin/VideoCallAdmin.jsx
import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:1111";
const ROOM_ID = "abc"; // Hard-coded for demo

export default function VideoCallAdmin() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const socketRef = useRef(null);

  const iceServers = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  useEffect(() => {
    // 1. Connect to Socket.IO
    socketRef.current = io(SOCKET_SERVER_URL, { transports: ["websocket"] });

    // 2. Get local camera/mic first
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(async (localStream) => {
        // 3. Create RTCPeerConnection after media acquisition
        peerConnectionRef.current = new RTCPeerConnection(iceServers);

        // 4. Setup ICE candidate handler
        peerConnectionRef.current.onicecandidate = (event) => {
          if (event.candidate) {
            socketRef.current.emit("ice-candidate", {
              roomId: ROOM_ID,
              candidate: event.candidate,
            });
          }
        };

        // 5. Setup remote track handler
        peerConnectionRef.current.ontrack = (event) => {
          console.log("Admin: Remote stream received:", event.streams[0]);
          remoteVideoRef.current.srcObject = event.streams[0];
        };

        // 6. Add local tracks to connection
        localStream.getTracks().forEach((track) => {
          peerConnectionRef.current.addTrack(track, localStream);
        });

        // 7. Show local video feed
        localVideoRef.current.srcObject = localStream;
        localVideoRef.current.muted = true;
        await localVideoRef.current.play().catch(console.error);

        // 8. Join room after media setup
        socketRef.current.emit("join-room", ROOM_ID);

        // 9. Listen for offer from user
        socketRef.current.on("offer", async ({ offer }) => {
          console.log("Admin: Received offer from user.");
          if (!peerConnectionRef.current) return;

          try {
            await peerConnectionRef.current.setRemoteDescription(
              new RTCSessionDescription(offer)
            );
            const answer = await peerConnectionRef.current.createAnswer();
            await peerConnectionRef.current.setLocalDescription(answer);
            
            socketRef.current.emit("answer", {
              roomId: ROOM_ID,
              answer: peerConnectionRef.current.localDescription,
            });
            console.log("Admin: Sent answer to user.");
          } catch (err) {
            console.error("Admin: Error handling offer:", err);
          }
        });
      })
      .catch((err) => {
        console.error("Admin: getUserMedia error:", err);
      });

    // 10. Setup ICE candidate listener
    socketRef.current.on("ice-candidate", async ({ candidate }) => {
      if (!peerConnectionRef.current || !candidate) return;
      try {
        await peerConnectionRef.current.addIceCandidate(
          new RTCIceCandidate(candidate)
        );
      } catch (err) {
        console.error("Admin: Error adding ICE candidate:", err);
      }
    });

    // Cleanup
    return () => {
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div>
      <h2>Admin Video Call (Callee) - Room: {ROOM_ID}</h2>
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