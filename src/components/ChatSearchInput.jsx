import React, { useState } from "react";
import { Input } from "antd";
import "./chatSearchInput.css";
import uuid from "react-uuid";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import { useAuth0 } from "@auth0/auth0-react";

const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

const ChatSearch = ({ user, socket, email, setAllConversations }) => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterState, setFilterState] = useState("");
  const [chatroom, setChatroom] = useState([]);
  const [chatrooms, setChatrooms] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  const handleFilter = (e) => {
    const searchUser = e.target.value;
    setFilterState(searchUser);
    const newFilter = user.allUserData.filter((value) => {
      return value.email_address.includes(searchUser);
      /*
      HOW TO FILTER FOR ONLY STUDENTS
      EXCLUDE '@ntu.edu.sg', OWN EMAIL AND ALREADY ACTIVE CONVERSATIONS
      &&
      !value.email_address.endsWith(`@ntu.edu.sg`)
      */
    });
    if (searchUser === "") {
      setFilteredUsers([]);
    } else {
      setFilteredUsers(newFilter);
    }
  };

  const handleCreateChat = async (recipientEmail) => {
    const accessToken = await getAccessTokenSilently({
      audience: `${audience}`,
      scope: "read:current_user",
    });
    const room = uuid(); // to render uuid for chatroom name
    const existingChatroom = chatrooms.find(
      (c) => c.members.includes(email) && c.members.includes(recipientEmail)
    );
    if (!existingChatroom) {
      socket.emit("create_room", {
        room,
        email,
        email_address: recipientEmail,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(
        "HANDLE CREATE CHAT",
        room,
        email,
        recipientEmail,
        chatrooms,
        accessToken
      );
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
      await setAllConversations(conversations);
    }, 700);
  };

  return (
    <>
      <div className="search">
        <div className="searchInputs">
          <Input
            type="text"
            placeholder="Search by email"
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
