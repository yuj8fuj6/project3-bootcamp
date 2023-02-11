import React, { useState } from "react";
import "./SideBar.css";
import { Tabs, Button, Modal } from "antd";
import Chat from "./Chat";
import Contacts from "./Contacts";
import NewChatModal from "./NewChatModal";
import NewContactModal from "./NewContactModal";

const CHATS_KEY = "Create Chat";
const CONTACTS_KEY = "Create Contact";

export default function SideBar() {
  const [activeKey, setActiveKey] = useState(CHATS_KEY);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const chatOpen = activeKey === CHATS_KEY;

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="side-bar-container">
      <Tabs
        defaultActiveKey={activeKey}
        onTabClick={setActiveKey}
        className="border-right overflow-auto flex-grow-1"
      >
        <Tabs.TabPane tab="Chat" key={CHATS_KEY}>
          <Chat />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Contacts" key={CONTACTS_KEY}>
          <Contacts />
        </Tabs.TabPane>
      </Tabs>
      <Button onClick={() => setIsModalOpen(true)}>
        New {chatOpen ? "Chat" : "Contact"}
      </Button>

      <Modal
        title={activeKey}
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
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
