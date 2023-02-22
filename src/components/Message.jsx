import React, { useEffect, useState } from "react";
import "./message.css";
import { Button, Input } from "antd";
import { useAuth0 } from "@auth0/auth0-react";

export default function Message(socket, room, email_address) {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  });

  const sendMessage = async () => {
    if (currentMessage) {
      const messageData = {
        message: currentMessage,
        room: room,
        sender: email_address,
        time: new Date(Date.now()),
      };
      await socket.emit("send_message", {
        currentMessage,
        room,
        email_address,
      });
      console.log("SENT MESSAGE", messageData);
      setMessageList((prevMessage) => [...prevMessage, messageData]);
      setCurrentMessage("");
    }
  };

  // useEffect(() => {
  //   // socket.on("receive_message", (data) => {
  //   //   console.log("RECEIVED MESSAGE", data);
  //   //   setMessageList((prevMessage) => [...prevMessage, data]);
  //   });
  // }, [socket]);

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
        <Input
          type="text"
          value={currentMessage}
          placeholder="Type something..."
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
        />
        <Button onClick={() => sendMessage()}>Send</Button>
        <Button>Confirm Index Swap</Button>
      </div>
    </div>
  );
}
