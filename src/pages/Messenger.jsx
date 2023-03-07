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
  const [chatroomName, setChatroomName] = useState("");

  const user = useContext(UserContext);
  const { email_address, first_name, last_name } = user.userData;

  const [currentConversation, setCurrentConversation] = useState({});
  const [displayChat, setdisplayChat] = useState(true);
  const [activeChatroomId, setactiveChatroomId] = useState("");
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
                    // first_name,
                    // last_name,
                    // email_address,
                    user.userData, // why not pass down the whole user object?
                    // currentConversation?.user?.email_address,
                    // currentConversation?.user?.first_name,
                    // currentConversation?.user?.last_name,
                    // currentConversation?.user?.profile_pic_url,
                    currentConversation.user, // why not just pass down the whole conversation?
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
