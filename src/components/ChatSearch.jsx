import React, { useState, useEffect, useContext } from "react";
import ChatSearchInput from "./ChatSearchInput";
import Conversation from "./Conversation";
import { BACKEND_URL } from "../constants";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

export default function ChatSearch({
  socket,
  setChatroomName,
  setCurrentConversation,
  setChatroomIndex,
}) {
  const [allConversations, setAllConversations] = useState([]);
  const [chatroom, setChatroom] = useState("");
  // const [currentChat, setCurrentChat] = useState(""); // boolean whether to display chat or not
  const user = useContext(UserContext);
  const { email_address } = user.userData; // logged in user

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

  const startChat = async (conversation) => {
    const chatRoomName = conversation.chatroom.room;
    socket.emit("join_chatroom", chatRoomName);

    const chatroomId = allConversations.filter(
      (room) => chatRoomName === room.chatroom.room
    )[0].chatroomId;
    // setCurrentChat(chatroomId);
    setChatroomIndex(chatroomId);
    setChatroomName(chatRoomName);
    setCurrentConversation(conversation);
    console.log("CHATSEARCH", conversation);
    console.log("hello", chatroomId);
  };

  return (
    <div>
      <ChatSearchInput
        user={user}
        socket={socket}
        email={email_address}
        onCreateChat={handleChatroom}
        setAllConversations={setAllConversations}
      />
      {allConversations.map((conversation, index) => (
        <Link
          to={`/messenger/${conversation.chatroom.room}`}
          key={index}
          onClick={() => startChat(conversation)}
        >
          <Conversation
            firstName={conversation.user.first_name}
            lastName={conversation.user.last_name}
            profilePic={conversation.user.profile_pic_url}
            chatroomName={conversation.chatroom.room}
            email={conversation.user.email_address}
          />
        </Link>
      ))}
    </div>
  );
}
