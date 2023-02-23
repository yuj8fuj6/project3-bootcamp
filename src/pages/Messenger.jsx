import React, { useContext, useEffect, useState } from "react";
import Message from "../components/Message";
import "./messenger.css";
import { Button, Input } from "antd";
import Navbar from "../components/NavBar";
import Conversation from "../components/Conversation";
import { useAuth0 } from "@auth0/auth0-react";
import io from "socket.io-client";
import { UserContext } from "../contexts/UserContext";
import ChatSearch from "../components/ChatSearch";

const socket = io.connect("http://localhost:3000");

const Messenger = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [room, setRoom] = useState("");
  const user = useContext(UserContext);
  const { email_address, first_name, last_name, profile_pic_url } =
    user.userData;

  socket.on("connect", () => {
    const userId = email_address;
    socket.emit("add_user", userId);
    console.log(userId);
  });
  // useEffect(() => {
  // });

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  });

  //<<<<<<<JOIN ROOM>>>>>>
  // const joinRoom = () => {
  //   if (room) {
  //     socket.emit("join_room", { room, email_address });
  //     console.log(`${email_address} has joined room ${room}`);
  //   }
  // };

  return (
    <>
      <Navbar />
      <div className="messenger">
        <div className="chatInbox">
          <div className="chatInboxWrapper">
            <ChatSearch user={user} socket={socket} email={email_address} />
            <h3>Join chat</h3>
            <Input
              type="text"
              placeholder="Room ID..."
              onChange={(event) => {
                setRoom(event.target.value);
              }}
              // onKeyPress={(e) => e.key === "Enter" && joinRoom()}
            />
            {/* <Button type="default" onClick={() => joinRoom()}>
              Join room
            </Button> */}
            {/* <Button type="default">Join a room</Button> */}
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
              email_address={email_address}
              firstName={first_name}
              lastName={last_name}
              profilePic={profile_pic_url}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
