import React, { useState } from "react";
import { Input, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import "./chatSearch.css";

const ChatSearch = ({ user }) => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterState, setFilterState] = useState("");

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
          {filteredUsers.slice(0, 5).map((value, index) => {
            return (
              <div className="searchItem">
                <p key={index}>{value.email_address}</p>
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
