import React from "react";
import "./conversation.css";

export default function Conversation({
  firstName,
  lastName,
  profilePic,
  email,
}) {
  return (
    <div className="conversation">
      <img
        src={profilePic}
        alt="conversation pic"
        className="conversationImage"
      />
      <div className="conversationWrapper">
        <span className="conversationName">
          {firstName} {lastName}
        </span>
        <span className="conversationEmail">{email}</span>
      </div>
    </div>
  );
}
