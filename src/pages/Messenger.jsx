import React from "react";
import "./messenger.css";
import { Input, Button } from "antd";
import Conversations from "../components/messengerComponents/Conversations";
import Message from "../components/messengerComponents/Message";

const Messenger = () => {
  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <Input placeholder="Search for email" className="chatMenuInput" />
          <Conversations />
          <Conversations />
          <Conversations />
          <Conversations />
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          <div className="chatBoxTop">
            <Message own={true} />
            <Message />
            <Message own={true} />
            <Message own={true} />
            <Message />
            <Message own={true} />
            <Message own={true} />
            <Message />
            <Message own={true} />
          </div>
          <div className="chatBoxBottom">
            <textarea
              className="chatMessageInput"
              placeholder="write something..."
            ></textarea>
            <Button className="chatSubmitButton" type="primary">
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
