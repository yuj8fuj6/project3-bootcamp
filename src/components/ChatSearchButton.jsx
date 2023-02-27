import { useState } from "react";
import { Modal, Button, Input } from "antd";
import "./courseModal.css";
import uuid from "react-uuid";
import { BACKEND_URL } from "../constants";
import axios from "axios";

export default function CourseModal({
  user,
  socket,
  email,
  setAllConversations,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterState, setFilterState] = useState("");
  const [chatroom, setChatroom] = useState([]);
  const [chatrooms, setChatrooms] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Course Details"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width="30vw"
        footer={null}
        className="modalBody"
      >
        <Input
          type="text"
          placeholder="Search by email"
          value={filterState}
          onChange={handleFilter}
          size="large"
          allowClear
        />
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
        <div className="modalFooter">
          <Button onClick={handleOk}>Exit</Button>
        </div>
      </Modal>
    </>
  );
}
