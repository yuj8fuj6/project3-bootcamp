import React from "react";
import "./conversations.css";

export default function Conversations() {
  return (
    <div className="conversation">
      <img
        className="conversationImage"
        src="https://images.unsplash.com/photo-1527082395-e939b847da0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1635&q=80"
        atl=""
      />
      <span className="conversationName">John Doe</span>
    </div>
  );
}
