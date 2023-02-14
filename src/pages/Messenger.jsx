import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Backend_URL } from "../Backend_URL";
import Message from "../components/messengerComponents/Message";
import "./messenger.css";
import { Button, Input } from "antd";
import Navbar from "../components/NavBar";
import axios from "axios";
import ChatInbox from "../components/messengerComponents/ChatInbox";

const socket = io.connect(Backend_URL);

export default function Messenger() {
  const [chatInbox, setChatInbox] = useState([]);
  const [chatInboxId, setChatInboxId] = useState();
  const [currentChat, setCurrentChat] = useState(true);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      console.log(`${username} has joined room ${room}`);
    }
  };

  useEffect(() => {
    // if there is chatInboxId, retrieve chatInbox
    if (chatInboxId) {
      axios.get(`${Backend_URL}/chatinbox/${chatInboxId}`).then((response) => {
        setChatInbox(response.data);
      });
    }
  }, [chatInboxId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "/chatconversation",
        message,
        setMessages([...message, res.data]),
        setNewMessage("")
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="messenger">
        <div className="chatInbox">
          <div className="chatInboxWrapper">
            {chatInbox.map((conversation) => (
              <div onClick={() => setCurrentChat(conversation)}>
                <ChatInbox conversation={conversation} />
              </div>
            ))}
            <Input
              placeholder="search for friends"
              className="chatInboxInput"
            />
            <h3>Join chat</h3>
            <Input
              type="text"
              placeholder="Name..."
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <Input
              type="text"
              placeholder="Room ID..."
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
            <Button type="default" onClick={joinRoom}>
              Join a room
            </Button>
          </div>
        </div>
        <div className="chatConversation">
          <div className="chatConversationWrapper">
            {currentChat ? (
              <Message socket={socket} username={username} room={room} />
            ) : (
              <p>Open a conversation to start a chat</p>
            )}
          </div>
          <div className="chatConversationInput">
            <textarea
              className="chatMessageInput"
              placeholder="write something..."
              onChange={(event) => {
                setNewMessage(event.target.value);
              }}
              value={newMessage}
            ></textarea>
            <Button className="chatSubmitButton" onClick={handleSubmit}>
              Send
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
