import React, { useState, useEffect } from "react";
// import React, { useState, useEffect, useContext } from "react";
import "./message.css";
import ScrollToBottom from "react-scroll-to-bottom";
import { Button, Input } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
// import { UserContext } from "../contexts/UserContext";

export default function Message({
  socket,
  room,
  email_address,
  firstName,
  lastName,
  profilePic,
}) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const author = firstName + " " + lastName;

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  });

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        message: currentMessage,
        room: room,
        sender: email_address,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", {
        currentMessage,
        room,
        email_address,
      });
      console.log("send message", messageData);
      setMessageList((prevList) => [...prevList, messageData]);
      // clears input after every message sent
      setCurrentMessage("");
    }
  };

  // updated chat when someone sends message
  // useEffect not triggering when emitting to specific room
  useEffect(() => {
    console.log("HELLO");
    console.log("ROOM", room);
    socket.on("receive_message", (data) => {
      console.log("emit receive message", data);
      setMessageList((prevList) => [...prevList, data]);
    });
  }, [socket, room]);

  // socket.on("receive_message", (data) => {
  //   console.log("emit receive message", data);
  //   setMessageList((prevList) => [...prevList, data]);
  // });

  // useEffect(() => {
  //   // console.log(socket);
  //   console.log("HELLO");

  //   // console.log("WORLD");
  //   // socket.on("send_chatData", (data) => {
  //   //   console.log("emit send chatData", data);
  //   //   setAllMessages(data);
  //   // });
  // }, [socket]);

  return (
    <div className="message">
      <div className="messageUser">
        <div className="messengerInfoContainer">
          <img
            src={profilePic}
            alt="profile pic"
            className="messengerProfileImage"
          />
          <div>
            <div>
              {firstName} {lastName}
            </div>
            <div>{email_address}</div>
          </div>
        </div>
        <div className="messageButtons">
          <Button>Delete chat</Button>
          <Button>View profile</Button>
        </div>
      </div>
      <div className="messageBody">
        <ScrollToBottom className="messageContainer">
          {messageList.map((messageContent, index) => {
            return (
              <div
                className="messageInfo"
                id={email_address === messageContent.sender ? "you" : "other"}
                key={index}
              >
                <div>
                  <div className="messageMeta">
                    <p id="author">{author}</p>
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
