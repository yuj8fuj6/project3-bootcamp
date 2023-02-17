import React, { useState, useEffect } from "react";
// import React, { useState, useEffect, useContext } from "react";
import "./message.css";
import ScrollToBottom from "react-scroll-to-bottom";
import { Button, Input } from "antd";
import LoggedInUserDisplay from "./LoggedInUserDisplay";
import { useAuth0 } from "@auth0/auth0-react";
// import { UserContext } from "../contexts/UserContext";

export default function Message({ socket, room, firstName, lastName }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const user = firstName + " " + lastName;

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  });

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        sender: user,
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

  // const sendMessage = async () => {
  //   if (currentMessage !== "") {
  //     const messageData = {
  //       message: currentMessage,
  //       sender: user.id,
  //       time:
  //         new Date(Date.now()).getHours() +
  //         ":" +
  //         new Date(Date.now()).getMinutes(),
  //     };

  //     const receiverId = current

  //     await socket.emit("send_message", {
  //       message
  //     });
  //     console.log(messageData);
  //     setMessageList((prevList) => [...prevList, messageData]);
  //     // clears input after every message sent
  //     setCurrentMessage("");
  //   }
  // };

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
                id={user === messageContent.sender ? "you" : "other"}
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
