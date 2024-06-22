import React, { useState,useEffect } from 'react';
import './App.css';
import { ChatFeed, Message } from 'react-chat-ui';
// import ChatInput from 'react-chat-ui';
import ChatWindow from './chaIn';

function App() {
  const [messages, setMessages] = useState([
    new Message({
      id: 1,
      message: "I'm the recipient! (The person you're talking to)",
    }),
    new Message({ id: 0, message: "I'm you -- the blue bubble!" }),
  ]);

  const handleSendMessage = (newMessageText) => {
    if (newMessageText.trim() !== "") {
      const newMessage = new Message({ id: 0, message: newMessageText });
      setMessages([...messages, newMessage]);

      // Send message to backend WebSocket server
      ws.send(newMessageText);
    }
  };

  useEffect(() => {
    // Connect to WebSocket server
    
    const ws = new WebSocket('ws://192.168.0.180:5000');

    // Handle incoming messages from server
    ws.onmessage = (event) => {
      const receivedMessage = new Message({ id: 1, message: event.data });
      setMessages([...messages, receivedMessage]);
    };

    return () => {
      // Clean up WebSocket connection
      ws.close();
    };
  }, []);


  return (
    <>
      <ChatFeed
        messages={messages}
        hasInputField={false}
        showSenderName
        bubblesCentered={false}
        bubbleStyles={{
          text: { fontSize: 15 },
          chatbubble: { borderRadius: 20, padding: 20 },
        }}
      />
      <ChatWindow onSendMessage={handleSendMessage} />
    </>
  );
}

export default App;
