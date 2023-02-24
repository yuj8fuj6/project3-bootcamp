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
  const [chatroom, setChatroom] = useState("");
  const user = useContext(UserContext);
  const { email_address, first_name, last_name, profile_pic_url } =
    user.userData;
  // const [conversations, setConversations] = useState([]);
  // const [webData, setWebData] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  });

  useEffect(() => {
    socket.on("add_user", (data) => {
      console.log("USERS ADDED", data);
    });
  }, [socket]);

  // useEffect(() => {
  //   console.log("INITIAL SHOW CONVERSATIONS");
  //   socket?.on("show_conversation", (data) => {
  //     setWebData(data);
  //     console.log("SHOW CONVERSATIONS", data);
  //   });
  // });

  // useEffect(() => {
  //   if (webData) {
  //     setConversations([...conversations, webData]);
  //     setWebData([]);
  //   }
  //   console.log("WEBDATA", webData);
  // }, []);

  const handleChatroom = (newChatroom) => {
    setChatroom(newChatroom);
    console.log("NEW CHATROOM", newChatroom);
  };

  return (
    <>
      <Navbar />
      <div className="messenger">
        <div className="chatInbox">
          <div className="chatInboxWrapper">
            <ChatSearch
              user={user}
              socket={socket}
              email={email_address}
              onCreateChat={handleChatroom}
            />
            {/* {conversations &&
              conversations.map((conversation, index) => (
                <div key={index}>
                  <Conversation />
                </div>
              ))} */}
          </div>
        </div>
        <div className="chatConversation">
          <div className="chatConversationWrapper">
            <Message
              socket={socket}
              chatroom={chatroom}
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
