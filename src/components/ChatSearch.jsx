import React, { useState } from "react";
import { Input } from "antd";
import "./chatSearch.css";
import uuid from "react-uuid";
import axios from "axios";
import { BACKEND_URL } from "../constants";

const ChatSearch = ({ user, socket, email, setAllConversations }) => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterState, setFilterState] = useState("");
  const [chatroom, setChatroom] = useState([]);
  const [chatrooms, setChatrooms] = useState([]);

  const handleFilter = (e) => {
    const searchUser = e.target.value;
    setFilterState(searchUser);
    const newFilter = user.allUserData.filter((value) => {
      return value.email_address.includes(searchUser);
    });
    if (searchUser === "") {
      setFilteredUsers([]);
    } else {
      setFilteredUsers(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredUsers([]);
    setFilterState([]);
  };

  const handleCreateChat = (recipientEmail) => {
    const room = uuid(); // to render uuid for chatroom name
    const existingChatroom = chatrooms.find(
      (c) => c.members.includes(email) && c.members.includes(recipientEmail)
    );
    if (!existingChatroom) {
      socket.emit("create_room", {
        room,
        email,
        email_address: recipientEmail,
      });
      console.log("HANDLE CREATE CHAT", room, email, recipientEmail, chatrooms);
      setChatrooms([
        ...chatrooms,
        { id: room, members: [email, recipientEmail] },
      ]);
      setFilteredUsers([]);
      setFilterState([]);
    } else {
      console.log("CHATROOM ALREADY EXISTS", existingChatroom);
      setChatroom(existingChatroom.id);
    }

    setTimeout(async () => {
      const { data: conversations } = await axios.get(
        `${BACKEND_URL}/conversations/${email}`
      );
      console.log("RESULT", conversations);
      setAllConversations(conversations);
    }, 700);
  };

  return (
    <>
      <div className="search">
        <div className="searchInputs">
          <Input
            type="text"
            placeholder="Search for friends"
            value={filterState}
            onChange={handleFilter}
            size="large"
            allowClear
          />
        </div>
      </div>
      {filteredUsers.length !== 0 && (
        <div className="searchResult">
          {filteredUsers.slice(0, 5).map((value) => {
            return (
              <div
                className="searchItem"
                key={value.id}
                onClick={async () =>
                  await handleCreateChat(value.email_address)
                }
              >
                <p>{value.email_address}</p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ChatSearch;
