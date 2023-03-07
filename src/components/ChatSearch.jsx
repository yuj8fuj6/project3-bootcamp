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
  const [chatroom, setChatroom] = useState(""); // is chatrooom a string? This seems wrong. chatRoom should be an object.
  const user = useContext(UserContext);
  const { email_address } = user.userData;

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

    // this filter could easily break if room.chatroom or room.chatroom.room is undefined.
    // You should be careful with chaining so many object keys
    // Why is the first item in the array the one of which you need the Id?
    // Also, why is there an object called room, that has a chatroom property, which has a room property? This seems like a bad data structure decision. One room is an object
    const chatroomId = allConversations.filter(
      (room) => chatRoomName === room.chatroom.room
    )[0].chatroomId;
    setChatroomIndex(chatroomId);
    setChatroomName(chatRoomName);
    setCurrentConversation(conversation);
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
            // I think can just pass down the conversation as a whole
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
