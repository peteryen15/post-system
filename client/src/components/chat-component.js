import React, { useEffect, useState } from "react";
import { closeWebSocket, initWebSocket, sendMessage } from "../utils/websocket";

const ChatComponent = ({ currentUser, setCurrentUser }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    initWebSocket();

    return () => {
      closeWebSocket();
    };
  }, []);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleClickSendMessage = () => {
    const message = { content: inputValue };
    sendMessage(message);
  };

  return (
    <div style={{ padding: "3rem", textAlign: "center" }}>
      <h1>ChatComponent</h1>
      <input type="text" onChange={handleInput} />
      <button onClick={handleClickSendMessage}>Send Message</button>
    </div>
  );
};

export default ChatComponent;
