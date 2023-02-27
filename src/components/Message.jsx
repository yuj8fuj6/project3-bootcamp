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
  recipientEmail,
}) {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [currentMessage, setCurrentMessage] = useState("");
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
      setCurrentMessage("");
      console.log("SENT", messageData);
    }
  };

  useEffect(() => {
    socket.on("receive_message", async (data) => {
      console.log("RECEIVED");
      await getMessages();
    });
  }, [socket]);

  useEffect(() => {
    getMessages();
  }, [chatroom]);

  useEffect(() => {
    getMessages();
  }, []);

  console.log("HELLO", chatroomId);
  const handleDelete = async () => {
    console.log("CHATROOM TO DELETE", chatroomId);
    await axios
      .post(`${BACKEND_URL}/conversations/deleteConversation`, {
        chatroomId: chatroomId,
      })
      .then((res) => {
        console.log("CHATROOM BE", chatroomId);
      })
      .catch((err) => {
        console.log("ERROR", err);
        alert("No conversation was deleted");
      });
  };

  const getMessages = async () => {
    console.log("inside getMessages");
    try {
      const response = await axios.get(
        `${BACKEND_URL}/conversations/messages/${chatroomId}`
      );
      setAllMessages(response.data);
    } catch (err) {
      console.log("ERROR", err);
    }
  };
  console.log("ALL MESSAGES", allMessages);

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
            <h1 className="userInfoName">
              {firstName} {lastName}
            </h1>
            <h1>{recipientEmail}</h1>
          </div>
        </div>
        <div className="messageButtonsWrapper">
          <Button className="messageButtons" onClick={handleDelete}>
            Delete chat
          </Button>
          <Button className="messageButtons">Confirm Index Swap</Button>
        </div>
      </div>
      <div className="messageBody">
        <ScrollToBottom className="messageContainer">
          {allMessages.map((allMessagesContent, index) => {
            return (
              <div
                className="messageInfo"
                id={
                  email_address === allMessagesContent.authorUser.email_address
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
                  <div className="messageWrapper">
                    <div className="messageText">
                      <p>{allMessagesContent.message}</p>
                    </div>
                    <div className="messageMeta">
                      <p id="time">{allMessagesContent.time}</p>
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
          size="large"
          type="text"
          value={currentMessage}
          placeholder="Write a message..."
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
      </div>
    </div>
  );
}
