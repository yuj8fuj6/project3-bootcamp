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
import axios from "axios";
import { BACKEND_URL } from "../constants.js";

const socket = io.connect("http://localhost:3000");

const Messenger = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [chatroom, setChatroom] = useState("");
  const user = useContext(UserContext);
  const { email_address, first_name, last_name, profile_pic_url } =
    user.userData;
  const [allConversations, setAllConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  });

  const getConversations = async () => {
    const { data: conversations } = await axios.get(
      `${BACKEND_URL}/conversations/${email_address}`
    );
    console.log("RESULT", conversations);
    setAllConversations(conversations);
  };

  useEffect(() => {
    getConversations();
  }, []);

  const handleChatroom = (newChatroom) => {
    setChatroom(newChatroom);
    console.log("NEW CHATROOM", newChatroom);
  };
  console.log("CONVERSATION", allConversations);

  const startChat = (chatroom) => {
    console.log("START CHAT");
    setChatroom(chatroom);
    setCurrentChat(true);
    console.log("CHATROOM", chatroom);
  };

  const closeChat = () => {
    console.log("CLOSE CHAT");
    setCurrentChat(null);
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
              setAllConversations={setAllConversations}
              setCurrentChat={setCurrentChat}
            />
            {allConversations.map((conversation, index) => (
              <div
                key={index}
                onClick={() => startChat(conversation.chatroom.room)}
              >
                <Conversation
                  firstName={conversation.user.first_name}
                  lastName={conversation.user.last_name}
                  profilePic={conversation.user.profile_pic_url}
                  chatroomName={conversation.chatroom.room}
                />
              </div>
            ))}
            <Button onClick={() => closeChat()}>clear</Button>
          </div>
        </div>
        <div className="chatConversation">
          <div className="chatConversationWrapper">
            {currentChat ? (
              <>
                <Message
                  socket={socket}
                  chatroom={chatroom}
                  email_address={email_address}
                  firstName={first_name}
                  lastName={last_name}
                  profilePic={profile_pic_url}
                  setCurrentChat={setCurrentChat}
                />
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
