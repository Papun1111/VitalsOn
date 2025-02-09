// src/components/VideoCall.jsx
import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";

// Change to your actual server URL, using HTTPS or localhost
const SOCKET_SERVER_URL = "http://localhost:1111";
const ROOM_ID = "abc"; // Hard-coded for demo

export default function VideoCall() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const socketRef = useRef(null);

  // STUN server (add TURN if needed)
  const iceServers = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  useEffect(() => {
    // 1. Connect to Socket.IO
    socketRef.current = io(SOCKET_SERVER_URL, { transports: ["websocket"] });

    // 2. Create PeerConnection
    peerConnectionRef.current = new RTCPeerConnection(iceServers);

    // 3. Local ICE candidates -> send to server
    peerConnectionRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit("ice-candidate", {
          roomId: ROOM_ID,
          candidate: event.candidate,
        });
      }
    };

    // 4. When remote track arrives, display it
    peerConnectionRef.current.ontrack = (event) => {
      console.log("User: Remote stream received:", event.streams[0]);
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    // 5. Join the room
    socketRef.current.emit("join-room", ROOM_ID);

    // 6. Listen for 'answer' from Admin
    socketRef.current.on("answer", async ({ answer }) => {
      console.log("User: Received answer:", answer);
      if (!peerConnectionRef.current) return;
      await peerConnectionRef.current.setRemoteDescription(answer);
    });

    // 7. Listen for ICE candidates from Admin
    socketRef.current.on("ice-candidate", async ({ candidate }) => {
      console.log("User: Received remote ICE candidate:", candidate);
      if (!peerConnectionRef.current) return;
      try {
        await peerConnectionRef.current.addIceCandidate(candidate);
      } catch (err) {
        console.error("User: Error adding ICE candidate", err);
      }
    });

    // 8. Get local camera/mic
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(async (stream) => {
        // Show local stream
        localVideoRef.current.srcObject = stream;
        localVideoRef.current.muted = true; // required so it can autoplay
        await localVideoRef.current.play().catch(err => console.error(err));

        // Add tracks to RTCPeerConnection
        stream.getTracks().forEach((track) => {
          peerConnectionRef.current.addTrack(track, stream);
        });

        // === CREATE & SEND OFFER immediately ===
        const offer = await peerConnectionRef.current.createOffer();
        await peerConnectionRef.current.setLocalDescription(offer);

        console.log("User: Sending offer to Admin...");
        socketRef.current.emit("offer", { roomId: ROOM_ID, offer });
      })
      .catch((err) => {
        console.error("User: getUserMedia error:", err);
      });

    // Cleanup on unmount
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
      <h2>User Video Call (Caller) - Room: {ROOM_ID}</h2>
      <div style={{ display: "flex", gap: "1rem" }}>
        <video
          ref={localVideoRef}
          style={{ width: "300px", backgroundColor: "black" }}
          playsInline
          autoPlay
          muted
        />
        <video
          ref={remoteVideoRef}
          style={{ width: "300px", backgroundColor: "black" }}
          playsInline
          autoPlay
        />
      </div>
    </div>
  );
}
