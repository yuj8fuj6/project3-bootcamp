import React, { useEffect } from "react";
import "./message.css";
import { Button, Input } from "antd";
import { useAuth0 } from "@auth0/auth0-react";

export default function Message() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  });

  return (
    <div className="message">
      <div className="messageUser">
        <div className="messengerInfoContainer">
          <img alt="profile pic" className="messengerProfileImage" />
          <div>
            <div>NAME</div>
            <div>EMAIL ADDRESS</div>
          </div>
        </div>
        <div className="messageButtons">
          <Button>Delete chat</Button>
          <Button>View profile</Button>
        </div>
      </div>
      <div className="messageBody">
        <div className="messageContainer">
          <div className="messageInfo">
            <div>
              <div className="messageMeta">
                <p id="author">SENDER</p>
                <p id="time">TIME</p>
              </div>
              <div className="messageText">
                <p>MESSAGE</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="messageBottom">
        <Input />
        <Button>Send</Button>
        <Button>Confirm Index Swap</Button>
      </div>
    </div>
  );
}
