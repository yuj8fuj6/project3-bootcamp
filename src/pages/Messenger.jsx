import React, { useContext, useEffect, useState } from "react";
import Message from "../components/Message";
import "./messenger.css";
import Navbar from "../components/NavBar";
import Conversation from "../components/Conversation";
import { useAuth0 } from "@auth0/auth0-react";
import io from "socket.io-client";
import { UserContext } from "../contexts/UserContext";
import ChatSearchInput from "../components/ChatSearchInput";
import axios from "axios";
import { BACKEND_URL } from "../constants.js";
import ChatSearch from "../components/ChatSearch";
import { Outlet, useOutlet } from "react-router-dom";

const socket = io.connect(BACKEND_URL);

const Messenger = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [chatroomName, setChatroomName] = useState(""); // chatroom name. used by socket

  const user = useContext(UserContext);
  const { email_address, first_name, last_name } = user.userData; // logged in user

  const [currentConversation, setCurrentConversation] = useState({}); // active conversation
  const [currentChat, setCurrentChat] = useState(true); // boolean whether to display chat or not
  const [chatroomIndex, setChatroomIndex] = useState(""); // active chat room id
  const outlet = useOutlet();

  socket.on("connect", () => {
    const userId = email_address;
    socket.emit("add_user", userId);
  });

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  });

  console.log("CURRENT", currentConversation);
  console.log("USER", user);
  // console.log(email_address);

  return (
    <>
      <Navbar />
      <div className="px-20 pt-10 font-extrabold text-2xl text-yellow">
        Messenger
      </div>
      <div className="messenger">
        <div className="chatInbox">
          <div className="chatInboxWrapper">
            <ChatSearch
              socket={socket}
              setChatroomName={setChatroomName}
              setCurrentConversation={setCurrentConversation}
              setChatroomIndex={setChatroomIndex}
            />
          </div>
        </div>
        <div className="chatConversation">
          <div className="chatConversationWrapper">
            {currentChat ? (
              <>
                <Outlet
                  context={[
                    socket,
                    chatroomName,
                    chatroomIndex,
                    first_name,
                    last_name,
                    email_address,
                    currentConversation?.user?.email_address,
                    currentConversation?.user?.first_name,
                    currentConversation?.user?.last_name,
                    currentConversation?.user?.profile_pic_url,
                  ]}
                />
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
