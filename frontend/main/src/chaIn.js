import React, { useState } from "react";

export default function ChatWindow({ onSendMessage }) {
    const [message, setMessage] = useState("");

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            onSendMessage(message);
            setMessage(""); // Clear the input field after sending
        }
    };

    return (
        <>
            <input
                style={{
                    width: '100%',
                    position: 'fixed',
                    bottom: '0',
                    zIndex: 1,
                    padding: '10px',
                    boxSizing: 'border-box',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    height: '60px'
                }}
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </>
    );
}
