// src/admin/VideoCallAdmin.jsx
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:1111"; // Match your server port
const ROOM_ID = "abc"; // You can make this dynamic later

export default function VideoCallAdmin() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const socketRef = useRef(null);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  const [error, setError] = useState(null);

  // ICE servers configuration
  const iceServers = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" }
    ],
  };

  useEffect(() => {
    // Reset error state
    setError(null);
    setConnectionStatus("Connecting to server...");

    // 1. Connect to Socket.IO server
    try {
      socketRef.current = io(SOCKET_SERVER_URL, { transports: ["websocket"] });
      setConnectionStatus("Connected to server");
    } catch (err) {
      setError("Failed to connect to server");
      return;
    }

    // 2. Get local media stream
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(async (localStream) => {
        // Display local stream
        localVideoRef.current.srcObject = localStream;
        localVideoRef.current.muted = true;
        setConnectionStatus("Got local media stream");

        // 3. Create RTCPeerConnection
        peerConnectionRef.current = new RTCPeerConnection(iceServers);

        // 4. Add local tracks to peer connection
        localStream.getTracks().forEach((track) => {
          peerConnectionRef.current.addTrack(track, localStream);
        });

        // 5. Handle ICE candidates
        peerConnectionRef.current.onicecandidate = (event) => {
          if (event.candidate) {
            socketRef.current.emit("ice-candidate", {
              roomId: ROOM_ID,
              candidate: event.candidate,
            });
          }
        };

        // 6. Handle incoming tracks
        peerConnectionRef.current.ontrack = (event) => {
          setConnectionStatus("Received remote stream");
          remoteVideoRef.current.srcObject = event.streams[0];
        };

        // 7. Join room
        socketRef.current.emit("join-room", ROOM_ID);
        setConnectionStatus("Joined room: " + ROOM_ID);

        // 8. Handle incoming offer
        socketRef.current.on("offer", async ({ offer }) => {
          setConnectionStatus("Received offer");
          if (!peerConnectionRef.current) return;
          
          try {
            await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await peerConnectionRef.current.createAnswer();
            await peerConnectionRef.current.setLocalDescription(answer);
            
            socketRef.current.emit("answer", { roomId: ROOM_ID, answer });
            setConnectionStatus("Sent answer");
          } catch (err) {
            setError("Failed to handle offer: " + err.message);
          }
        });

        // 9. Handle incoming ICE candidates
        socketRef.current.on("ice-candidate", async ({ candidate }) => {
          if (!peerConnectionRef.current || !candidate) return;
          try {
            await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
          } catch (err) {
            setError("Failed to add ICE candidate: " + err.message);
          }
        });

      })
      .catch((err) => {
        setError("Failed to access camera/microphone: " + err.message);
      });

    // Cleanup function
    return () => {
      if (localVideoRef.current?.srcObject) {
        localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Admin Video Call (Callee) - Room: {ROOM_ID}</h2>
      <div className="mb-4">
        <p>Status: {connectionStatus}</p>
        {error && <p className="text-red-500">Error: {error}</p>}
      </div>
      <div className="flex gap-4">
        <div>
          <h3 className="mb-2">Local Video</h3>
          <video
            ref={localVideoRef}
            className="w-[300px] bg-black"
            autoPlay
            playsInline
            muted
          />
        </div>
        <div>
          <h3 className="mb-2">Remote Video</h3>
          <video
            ref={remoteVideoRef}
            className="w-[300px] bg-black"
            autoPlay
            playsInline
          />
        </div>
      </div>
    </div>
  );
}