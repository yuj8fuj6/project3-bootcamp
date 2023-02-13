import React, { useState, useEffect } from "react";
import "./message.css";
import ScrollToBottom from "react-scroll-to-bottom";
import { Button, Input } from "antd";

export default function Message({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      console.log(messageData);
      setMessageList((prevList) => [...prevList, messageData]);
      // clears input after every message sent
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessageList((prevList) => [...prevList, data]);
    });
  });

  return (
    <div className="message">
      <div className="messageTop">
        <h1>LIVE CHAT</h1>
      </div>
      <div className="messageBody">
        <ScrollToBottom className="messageContainer">
          {messageList.map((messageContent) => {
            return (
              <div
                className="messageInfo"
                id={username === messageContent.author ? "you" : "other"}
                // id="you"
              >
                <div>
                  <div className="messageText">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="messageMeta">
                    <p>{messageContent.time}</p>
                    <p>{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="messageBottom">
        <Input
          type="text"
          placeholder="Type something..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(e) => {
            e.key === "Enter" && sendMessage();
          }}
        />
        <Button type="primary" onClick={sendMessage}>
          Send
        </Button>
      </div>
    </div>
  );
}
