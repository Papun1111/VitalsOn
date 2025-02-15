import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const SOCKET_SERVER_URL = "https://medscriptionog.onrender.com"; // Match your server port

export default function VideoCall() {
  const { roomId } = useParams(); // Get roomId from URL
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
      { urls: "stun:stun1.l.google.com:19302" },
    ],
  };

  useEffect(() => {
    // If roomId doesn't exist, we can fall back to a default or handle error
    const activeRoomId = roomId || "abc";

    // Reset error state
    setError(null);
    setConnectionStatus("Connecting to server...");

    // 1. Connect to Socket.IO
    try {
      socketRef.current = io(SOCKET_SERVER_URL, { transports: ["websocket"] });
      setConnectionStatus("Connected to server");
    } catch (err) {
      setError("Failed to connect to server");
      return;
    }

    // 2. Create RTCPeerConnection
    peerConnectionRef.current = new RTCPeerConnection(iceServers);

    // 3. Handle ICE candidates
    peerConnectionRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit("ice-candidate", {
          roomId: activeRoomId,
          candidate: event.candidate,
        });
      }
    };

    // 4. Handle incoming tracks
    peerConnectionRef.current.ontrack = (event) => {
      setConnectionStatus("Received remote stream");
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    // 5. Join room
    socketRef.current.emit("join-room", activeRoomId);
    setConnectionStatus("Joined room: " + activeRoomId);

    // 6. Handle answer from Admin
    socketRef.current.on("answer", async ({ answer }) => {
      setConnectionStatus("Received answer");
      if (!peerConnectionRef.current) return;
      try {
        await peerConnectionRef.current.setRemoteDescription(
          new RTCSessionDescription(answer)
        );
        setConnectionStatus("Connected to peer");
      } catch (err) {
        setError("Failed to set remote description: " + err.message);
      }
    });

    // 7. Handle incoming ICE candidates
    socketRef.current.on("ice-candidate", async ({ candidate }) => {
      if (!peerConnectionRef.current || !candidate) return;
      try {
        await peerConnectionRef.current.addIceCandidate(
          new RTCIceCandidate(candidate)
        );
      } catch (err) {
        setError("Failed to add ICE candidate: " + err.message);
      }
    });

    // 8. Get local media and create offer
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(async (stream) => {
        // Show local stream
        localVideoRef.current.srcObject = stream;
        localVideoRef.current.muted = true;
        setConnectionStatus("Got local media stream");

        // Add tracks to RTCPeerConnection
        stream.getTracks().forEach((track) => {
          peerConnectionRef.current.addTrack(track, stream);
        });

        // Create and send offer
        try {
          const offer = await peerConnectionRef.current.createOffer();
          await peerConnectionRef.current.setLocalDescription(offer);
          socketRef.current.emit("offer", {
            roomId: activeRoomId,
            offer,
          });
          setConnectionStatus("Sent offer");
        } catch (err) {
          setError("Failed to create offer: " + err.message);
        }
      })
      .catch((err) => {
        setError("Failed to access camera/microphone: " + err.message);
      });

    // Cleanup function
    return () => {
      if (localVideoRef.current?.srcObject) {
        localVideoRef.current.srcObject.getTracks().forEach((track) =>
          track.stop()
        );
      }
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [roomId]);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">
        User Video Call (Caller) - Room: {roomId || "abc"}
      </h2>
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
