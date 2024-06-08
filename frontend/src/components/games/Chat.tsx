import React from "react";
import "./Card.css";

type ChatProps = {
  messages: string[];
};

const Chat: React.FC<ChatProps> = ({ messages }) => {
  return (
    <div className="chat">
      <h2>Chat</h2>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
