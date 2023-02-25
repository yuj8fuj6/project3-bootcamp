import React, { useContext, useEffect, useState } from "react";
import Message from "../components/Message";
import "./messenger.css";
import { Button } from "antd";
import Navbar from "../components/NavBar";
import Conversation from "../components/Conversation";
import { useAuth0 } from "@auth0/auth0-react";
import io from "socket.io-client";
import { UserContext } from "../contexts/UserContext";
import ChatSearch from "../components/ChatSearch";
import axios from "axios";
import { BACKEND_URL } from "../constants.js";

const socket = io.connect(BACKEND_URL);

const Messenger = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [chatroom, setChatroom] = useState("");
  const user = useContext(UserContext);
  const { email_address, first_name, last_name, profile_pic_url } =
    user.userData;
  const [allConversations, setAllConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState("");
  const [chatroomIndex, setChatroomIndex] = useState("");

  console.log(socket);

  socket.on("connect", () => {
    console.log("CLIENT CONNECTED");
    const userId = email_address;
    socket.emit("add_user", userId);
    console.log("ADDED USER", userId);
  });

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
    console.log("JOIN CHATROOM", chatroom);
    socket.emit("join_chatroom", chatroom);
    console.log("JOINED");
    setChatroom(chatroom);
    setCurrentChat(chatroom);
    const chatroomId = allConversations.filter(
      (room) => chatroom === room.chatroom.room
    )[0].chatroomId;
    console.log("CHATROOM ID", chatroomId);
    console.log("CHATROOM", chatroom);
    setChatroomIndex(chatroomId);
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
                  chatroomId={chatroomIndex}
                  email_address={email_address}
                  firstName={first_name}
                  lastName={last_name}
                  profilePic={profile_pic_url}
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
