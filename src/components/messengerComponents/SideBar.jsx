import React, { useState } from "react";
import "./SideBar.css";
import { Tabs, Button, Modal } from "antd";
import Chat from "./Chat";
import Contacts from "./Contacts";
import NewChatModal from "./NewChatModal";
import NewContactModal from "./NewContactModal";

const CHATS_KEY = "Chat";
const CONTACTS_KEY = "Contacts";

export default function SideBar() {
  const [activeKey, setActiveKey] = useState(CHATS_KEY);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const chatOpen = activeKey === CHATS_KEY;

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="side-bar-container">
      <Tabs
        defaultActiveKey={activeKey}
        onSelect={setActiveKey}
        className="border-right overflow-auto flex-grow-1"
      >
        <Tabs.TabPane tab="Chat" key={CHATS_KEY}>
          <Chat />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Contacts" key={CONTACTS_KEY}>
          <Contacts />
        </Tabs.TabPane>
      </Tabs>
      <Button onClick={showModal}>New {chatOpen ? "Chat" : "Contact"}</Button>

      <Modal
        title={activeKey}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {activeKey === CHATS_KEY ? (
          <NewChatModal closeModal={closeModal} />
        ) : (
          <NewContactModal closeModal={closeModal} />
        )}
      </Modal>
    </div>
  );
}
