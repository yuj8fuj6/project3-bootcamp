import React, { useEffect, useState, useContext, useMemo } from "react";
import io from "socket.io-client";
import Message from "../components/Message";
import "./messenger.css";
import { Button, Input } from "antd";
import Navbar from "../components/NavBar";
import Conversation from "../components/Conversation";
import { UserContext } from "../contexts/UserContext";
import { useAuth0 } from "@auth0/auth0-react";

const Messenger = () => {
  const socket = useMemo(() => io("http://localhost:3000"), []);
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const user = useContext(UserContext);
  const { email_address, first_name, last_name, profile_pic_url } = user;

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  });

  // add users in the chatroom to an array
  // useEffect not triggering
  // useEffect(() => {
  //   socket.emit("add_user", email_address);
  //   console.log("added user", email_address);
  //   socket.on("get_users", (email_address) => {
  //     console.log([email_address]);
  //   });
  // }, [email_address]);

  //<<<<<<<JOIN ROOM>>>>>>
  const [room, setRoom] = useState("");
  const joinRoom = async () => {
    if (room !== "") {
      socket.emit("join_room", { room, email_address });
      console.log(`${first_name} ${last_name} has joined room ${room}`);
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
