import React, { useEffect, useState } from "react";
import "./message.css";
import { Button, Input } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";
import { BACKEND_URL } from "../constants";

export default function Message({
  socket,
  chatroom,
  email_address,
  firstName,
  lastName,
  profilePic,
  chatroomId,
  setCurrentChat,
}) {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, []);

  const sendMessage = async () => {
    if (currentMessage) {
      const messageData = {
        message: currentMessage,
        room: chatroom,
        sender: email_address,
        name: `${firstName} ${lastName}`,
        profileDP: profilePic,
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
    socket.emit("receive_message", (data) => {
      console.log("RECEIVED MESSAGE", data);
      setMessageList((prevMessage) => [...prevMessage, data]);
    });
    console.log("RECEIVED");
  }, [socket]);

  useEffect(() => {
    socket.on("message_history", (data) => {
      console.log("SEND CHAT DATA", data);
      setAllMessages(data);
      // setCurrentChat(true);
    });
  }, []);

  const getMessages = async () => {
    try {
      axios
        .get(`${BACKEND_URL}/conversations/messages/${chatroomId}`)
        .then((response) => {
          console.log("RESPONSE", response, response.data);
          setCurrentChat(response.data);
          setAllMessages(response.data);
        });
    } catch (err) {
      console.log("ERROR", err);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className="message">
      <div className="messageUser">
        <div className="messengerInfoContainer">
          <img
            src={profilePic}
            alt="profile pic"
            className="messengerProfileImage"
          />
          <div className="userInfoContainer">
            <h1>
              {firstName} {lastName}
            </h1>
            <h1>{email_address}</h1>
          </div>
        </div>
        <div className="messageButtons">
          <Button>Delete chat</Button>
          <Button>View profile</Button>
        </div>
      </div>
      <div className="messageBody">
        <ScrollToBottom className="messageContainer">
          {allMessages &&
            allMessages.map((allMessagesContent, index) => {
              return (
                <div
                  className="messageInfo"
                  id={
                    email_address ===
                    allMessagesContent.authorUser.email_address
                      ? "you"
                      : "other"
                  }
                  key={index}
                >
                  <div className="messageFlex">
                    <img
                      src={allMessagesContent.authorUser.profile_pic_url}
                      alt="profile pic"
                      className="messageProfileImage"
                    />
                    <div>
                      <div className="messageMeta">
                        <p id="author">
                          {`${allMessagesContent.authorUser.first_name} ${allMessagesContent.authorUser.last_name}`}
                        </p>
                        <p id="time">{allMessagesContent.time}</p>
                      </div>
                      <div className="messageText">
                        <p>{allMessagesContent.message}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          {messageList.map((messageContent, index) => {
            return (
              <div
                className="messageInfo"
                id={email_address === messageContent.sender ? "you" : "other"}
                key={index}
              >
                <div className="messageFlex">
                  <img
                    src={messageContent.profileDP}
                    alt="profile pic"
                    className="messageProfileImage"
                  />
                  <div>
                    <div className="messageMeta">
                      <p id="author">{messageContent.name}</p>
                      <p id="time">{messageContent.time}</p>
                    </div>
                    <div className="messageText">
                      <p>{messageContent.message}</p>
                    </div>
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
          value={currentMessage}
          placeholder="Type something..."
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button onClick={() => sendMessage()}>Send</Button>
        <Button>Confirm Index Swap</Button>
      </div>
    </div>
  );
}
