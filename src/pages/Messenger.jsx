import React, { useState } from "react";
import io from "socket.io-client";
import { Backend_URL } from "../Backend_URL";
import Chat from "../components/messengerComponents/Chat";

const socket = io.connect(Backend_URL);

export default function Messenger() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      console.log(`${username} has joined room ${room}`);
    }
  };

  return (
    <div>
      <h3>Join chat</h3>
      <input
        type="text"
        placeholder="Name..."
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Room ID..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}>Join a room</button>

      <Chat socket={socket} username={username} room={room} />
    </div>
  );
}
