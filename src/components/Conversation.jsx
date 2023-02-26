import React from "react";
import "./conversation.css";

export default function Conversation({ firstName, lastName, profilePic }) {
  return (
    <div className="conversation">
      <img
        src={profilePic}
        alt="conversation pic"
        className="conversationImage"
      />
      <span className="conversationName">
        {firstName} {lastName}
      </span>
    </div>
  );
}
