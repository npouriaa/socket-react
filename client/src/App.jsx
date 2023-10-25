import React, { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import { useEffect } from "react";

const socket = io.connect("http://localhost:5174");

const App = () => {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const sendMessage = () => {
    socket.emit("send_message", {
      message: message,
    });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <div>
      <input
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="message..."
      />
      <button onClick={() => sendMessage()}>Send message</button>
      <h1>Message :</h1>
      {messageReceived}
    </div>
  );
};

export default App;
