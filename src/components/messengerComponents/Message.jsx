import React, { useState, useEffect } from "react";
import "./message.css";
import ScrollToBottom from "react-scroll-to-bottom";
import { Button, Input } from "antd";
import LoggedInUserDisplay from "../LoggedInUserDisplay";

export default function Message({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        sender: username,
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
  }, [socket]);

  return (
    <div className="message">
      <div className="messageUser">
        <LoggedInUserDisplay />
        <div className="messageButtons">
          <Button>Delete chat</Button>
          <Button>View profile</Button>
        </div>
      </div>
      <div className="messageBody">
        <ScrollToBottom className="messageContainer">
          {messageList.map((messageContent) => {
            return (
              <div
                className="messageInfo"
                id={username === messageContent.sender ? "you" : "other"}
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
        </ScrollToBottom>
      </div>
      <div className="messageBottom">
        <Input
          type="text"
          // IMPORTANT TO ADD THIS VALUE
          value={currentMessage}
          placeholder="Type something..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          // when you press the "enter" button
          onKeyPress={(e) => {
            e.key === "Enter" && sendMessage();
          }}
        />
        <Button onClick={sendMessage}>Send</Button>
        <Button>Confirm Index Swap</Button>
      </div>
    </div>
  );
}
