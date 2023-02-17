import React, { useEffect, useState, useContext } from "react";
import io from "socket.io-client";
import Message from "../components/Message";
import "./messenger.css";
import { Button, Input } from "antd";
import Navbar from "../components/NavBar";
import Conversation from "../components/Conversation";
import { UserContext } from "../contexts/UserContext";
import { useAuth0 } from "@auth0/auth0-react";

const socket = io.connect(`http://localhost:3000`);

const Messenger = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const user = useContext(UserContext);
  const { email_address, first_name, last_name } = user;

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  });

  //<<<<<<<JOIN ROOM>>>>>>
  const [room, setRoom] = useState("");
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", { room, email_address });
      // socket.emit("join_room", {user.email, room, targetUser.email})
      console.log(`${first_name} ${last_name} has joined room ${room}`);
    }
  };

  // add users in the chatroom to an array
  useEffect(() => {
    socket.emit("add_user", email_address);
    socket.on("get_users", (email_address) => {
      console.log(email_address);
    });
  }, [email_address]);

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
            <Button type="default" onClick={joinRoom}>
              Join a room
            </Button>
            <Conversation />
            <Conversation />
            <Conversation />
          </div>
        </div>
        <div className="chatConversation">
          <div className="chatConversationWrapper">
            <Message
              socket={socket}
              room={room}
              email={email_address}
              firstName={first_name}
              lastName={last_name}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
