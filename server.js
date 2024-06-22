const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Set up a simple HTTP server
app.get('/', (req, res) => {
    res.send('WebSocket server is up and running.');
});

// WebSocket server logic
wss.on('connection', (ws) => {
    console.log('Client connected.');

    // Handle incoming messages from clients
    ws.on('message', (message) => {
        console.log('Received message:', message);

        // Broadcast the message to all clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log('Client disconnected.');
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, '192.168.0.180', () => {
    console.log(`Server started on port ${PORT}`);
});
