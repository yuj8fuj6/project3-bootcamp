import React, { useEffect, useState } from "react";
import "./message.css";
import { Button, Input } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import IndexSwapModal from "../components/IndexSwapModal";
import ViewProfileModal from "../components/ViewProfileModal";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { useOutletContext } from "react-router-dom";

const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
const socket = io.connect(BACKEND_URL);

export default function Message() {
  const { isAuthenticated, loginWithRedirect, getAccessTokenSilently } =
    useAuth0();
  const [currentMessage, setCurrentMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  // const [chatroomName, setChatroomName] = useState("");

  const [
    socket,
    chatroomName,
    chatroomIndex,
    first_name,
    last_name,
    email_address,
    recipientEmail,
    otherUserFirstName,
    otherUserLastName,
    profilePic,
  ] = useOutletContext();
  console.log("CHATROOM INDEX", chatroomIndex);

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, []);

  const sendMessage = async () => {
    const accessToken = await getAccessTokenSilently({
      audience: `${audience}`,
      scope: "read:current_user",
    });
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, 0);
    const time = `${hours}:${minutes}`;
    if (currentMessage) {
      const messageData = {
        message: currentMessage,
        room: chatroomName,
        sender: email_address,
        name: `${first_name} ${last_name}`,
        profileDP: profilePic,
        time: time,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      await socket.emit("send_message", messageData);
      await setCurrentMessage("");
      await getMessages();
      console.log(messageData);
    }
  };

  useEffect(() => {
    console.log("USE EFFECT CHATID", chatroomIndex);
    socket.on("receive_message", async (data) => {
      console.log("RECEIVED", data);
      await getMessages(chatroomIndex);
    });
  }, [socket]);

  useEffect(() => {
    console.log("USE EFFECT 1");
    getMessages();
  }, [chatroomName]);

  useEffect(() => {
    console.log("USE EFFECT 2");
    getMessages();
  }, []);

  const getMessages = async (chatroomID) => {
    console.log("SEND CHATROOM ID", chatroomID);
    console.log(chatroomID);
    console.log(chatroomIndex);
    const response = await axios
      .get(
        `${BACKEND_URL}/conversations/messages/${chatroomIndex}`
        // "http://localhost:3000/conversations/messages/14b88b81-7d99-4b91-bfb2-339eed17b447"
      )
      .then((response) => {
        setAllMessages(response.data);
      });
  };

  console.log("ALL MESSAGES", allMessages);

  return (
    <Link to={`/messenger/${chatroomName}`} className="message">
      <div className="messageUser">
        <div className="messengerInfoContainer">
          <img
            src={profilePic}
            alt="profile pic"
            className="messengerProfileImage"
          />
          <div className="userInfoContainer">
            <h1 className="userInfoName">
              {otherUserFirstName} {otherUserLastName}
            </h1>
            <h1>{recipientEmail}</h1>
          </div>
        </div>
        <div className="messageButtonsWrapper">
          <div className="messageTopBtn">
            <ViewProfileModal recipientEmail={recipientEmail} />
          </div>
          <div className="messageTopBtn">
            <IndexSwapModal className="messageTopBtn" />
          </div>
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
    </Link>
  );
}
