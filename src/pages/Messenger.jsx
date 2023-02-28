import React, { useContext, useEffect, useState } from "react";
import Message from "../components/Message";
import "./messenger.css";
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
  const [chatroom, setChatroom] = useState(""); // chatroom name. used by socket
  const user = useContext(UserContext);
  const { email_address } = user.userData; // logged in user
  const [allConversations, setAllConversations] = useState([]); // list of conversations
  const [currentConversation, setCurrentConversation] = useState({}); // active conversation
  const [currentChat, setCurrentChat] = useState(false); // boolean whether to display chat or not
  const [chatroomIndex, setChatroomIndex] = useState(""); // active chat room id

  socket.on("connect", () => {
    const userId = email_address;
    socket.emit("add_user", userId);
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
    setAllConversations(conversations);
  };

  useEffect(() => {
    getConversations();
  }, []);

  const handleChatroom = (newChatroom) => {
    setChatroom(newChatroom);
  };

  const startChat = (conversation) => {
    setCurrentConversation(conversation);
    const chatRoomName = conversation.chatroom.room;
    socket.emit("join_chatroom", chatRoomName);
    setCurrentChat(true);
    const chatroomId = allConversations.filter(
      (room) => chatRoomName === room.chatroom.room
    )[0].chatroomId;
    setChatroomIndex(chatroomId);
  };

  console.log("CURRENT CONVERSATION", currentConversation);
  console.log("ALL CONVERSATION", allConversations);

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
              <div key={index} onClick={() => startChat(conversation)}>
                <Conversation
                  firstName={conversation.user.first_name}
                  lastName={conversation.user.last_name}
                  profilePic={conversation.user.profile_pic_url}
                  chatroomName={conversation.chatroom.room}
                  email={conversation.user.email_address}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="chatConversation">
          <div className="chatConversationWrapper">
            {currentChat ? (
              <>
                <Message
                  socket={socket}
                  chatroom={currentConversation.chatroom.room}
                  chatroomId={chatroomIndex}
                  email_address={email_address}
                  recipientEmail={currentConversation.user.email_address}
                  firstName={currentConversation.user.first_name}
                  lastName={currentConversation.user.last_name}
                  profilePic={currentConversation.user.profile_pic_url}
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
