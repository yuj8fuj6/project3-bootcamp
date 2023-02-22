import React, { useEffect, useState } from "react";
import "./message.css";
import { Button, Input } from "antd";
import { useAuth0 } from "@auth0/auth0-react";

export default function Message({ socket, room, email_address }) {
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
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      console.log("SENT MESSAGE", messageData);
      setMessageList((prevMessage) => [...prevMessage, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("RECEIVED MESSAGE", data);
      setMessageList((prevMessage) => [...prevMessage, data]);
    });
  }, [socket]);

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
          {messageList.map((messageContent, index) => {
            return (
              <div
                className="messageInfo"
                id={email_address === messageContent.sender ? "you" : "other"}
                key={index}
              >
                <div>
                  <div className="messageMeta">
                    <p id="author">{messageContent.sender}</p>
                    <p id="time">{messageContent.time}</p>
                  </div>
                  <div className="messageText">
                    <p>{messageContent.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
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
