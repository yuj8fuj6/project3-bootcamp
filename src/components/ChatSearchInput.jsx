import React, { useState } from "react";
import { Input } from "antd";
import "./chatSearchInput.css";
import uuid from "react-uuid";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import { useAuth0 } from "@auth0/auth0-react";

const ChatSearch = ({ user, socket, email, setAllConversations }) => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterState, setFilterState] = useState("");
  const [chatroom, setChatroom] = useState([]);
  const [chatrooms, setChatrooms] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  const handleFilter = (e) => {
    const searchUser = e.target.value;
    setFilterState(searchUser);
    // all users could potentially be millions of users
    // if you want to filter here, I would recommend doing that on the backend. That way we will not expose all users to the FE, and can retrieve only the names of the users we need, while not impacting performance on the browser. The browser has limited memory and can only hand so many user objects at once.
    const newFilter = user.allUserData.filter((value) => {
      return value.email_address.includes(searchUser);
      /*
      HOW TO FILTER FOR ONLY STUDENTS
      EXCLUDE '@ntu.edu.sg', OWN EMAIL AND ALREADY ACTIVE CONVERSATIONS
      &&
      !value.email_address.endsWith(`@ntu.edu.sg`)
      */
    });
    if (!searchUser) {
      setFilteredUsers([]);
    } else {
      setFilteredUsers(newFilter);
    }
  };

  const handleCreateChat = async (recipientEmail) => {
    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH0_AUDIENCE, // i think before and now there are no template literals necessary
      scope: "read:current_user",
    });
    const roomId = uuid(); // it is an id, not a room
    const existingChatroom = chatrooms.find(
      (c) => c.members.includes(email) && c.members.includes(recipientEmail)
    );
    if (!existingChatroom) {
      socket.emit("create_room", {
        roomId,
        email,
        email_address: recipientEmail,
        headers: {
          Authorization: `Bearer ${accessToken}`, // I don't recall you using the auth middleware on the BE, so why send this over?
        },
        token: `Bearer ${accessToken}`, // you could just send the accesstoken like so, no need for a headers object
      });
      setChatrooms([
        ...chatrooms,
        { id: roomId, members: [email, recipientEmail] },
      ]);
      setFilteredUsers([]);
      setFilterState([]);
    } else {
      setChatroom(existingChatroom.id);
    }

    setTimeout(async () => {
      const { data: conversations } = await axios.get(
        `${BACKEND_URL}/conversations/${email}`
      );
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
      {filteredUsers.length && ( // over 0 is truthy, 0 is falsy
        <div className="searchResult">
          {/* a comment would be nice here to understand what the slice is doing */}
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
