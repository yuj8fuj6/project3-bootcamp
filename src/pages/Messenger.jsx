import React, { useEffect, useState } from "react";
import Message from "../components/Message";
import "./messenger.css";
import { Button, Input } from "antd";
import Navbar from "../components/NavBar";
import Conversation from "../components/Conversation";
import { useAuth0 } from "@auth0/auth0-react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3000");

const Messenger = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [room, setRoom] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  });

  //<<<<<<<JOIN ROOM>>>>>>
  const joinRoom = async () => {
    if (room) {
      socket.emit("join_room", { room });
    }
  };

  return (
    <>
      <Navbar />
      <div className="messenger">
        <div className="chatInbox">
          <div className="chatInboxWrapper">
            <Button>Search for user</Button>
            <h3>Join chat</h3>
            <Input
              type="text"
              placeholder="Room ID..."
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
            <Button type="default" onClick={() => joinRoom()}>
              Join a room
            </Button>
            <Conversation />
            <Conversation />
            <Conversation />
          </div>
        </div>
        <div className="chatConversation">
          <div className="chatConversationWrapper">
            <Message />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
