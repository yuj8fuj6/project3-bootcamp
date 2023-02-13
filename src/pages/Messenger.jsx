import React, { useState } from "react";
import io from "socket.io-client";
import { Backend_URL } from "../Backend_URL";
import Message from "../components/messengerComponents/Message";
import "./messenger.css";
import { Button, Input } from "antd";

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
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <h3>Join chat</h3>
          <Input
            type="text"
            placeholder="Name..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <Input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <Button type="default" onClick={joinRoom}>
            Join a room
          </Button>
        </div>
      </div>

      <div className="chatBox">
        <div className="chatBoxWrapper">
          <div className="chatBoxTop">
            <Message socket={socket} username={username} room={room} />
          </div>
        </div>
      </div>
    </div>
  );
}
