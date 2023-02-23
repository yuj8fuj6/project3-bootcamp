import React, { useState } from "react";
import { Input, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import "./chatSearch.css";

const ChatSearch = ({ user, socket }) => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterState, setFilterState] = useState("");
  const [room, setRoom] = useState("");

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
  };

  const handleCreateChat = (email_address) => {
    socket.emit("join_room", { room, email_address });
    console.log("HANDLE CREATE CHAT", room, email_address);
  };

  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }

  console.log(uuidv4());

  return (
    <>
      <div className="search">
        <div className="searchInputs">
          <Input
            type="text"
            placeholder="Search for friends"
            value={filterState}
            onChange={handleFilter}
          />
          <div className="searchIcon">
            {filteredUsers.length === 0 ? null : (
              <CloseOutlined id="clearBtn" onClick={clearInput} />
            )}
          </div>
        </div>
      </div>
      {filteredUsers.length !== 0 && (
        <div className="searchResult">
          {filteredUsers.slice(0, 5).map((value) => {
            return (
              <div
                className="searchItem"
                key={value.id}
                onClick={() => handleCreateChat(value.email_address)}
              >
                <p>{value.email_address}</p>
              </div>
            );
          })}
        </div>
      )}
      <Button>Chat</Button>
    </>
  );
};

export default ChatSearch;
