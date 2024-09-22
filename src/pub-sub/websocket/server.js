import { WebSocketServer } from "ws";
import { webSocketServerPort } from "./../shared.js";

const wss = new WebSocketServer({ port: webSocketServerPort });

// Broadcast message to all connected clients
function broadcast(message) {
  wss.clients.forEach((client) => {
    client.send(message);
  });
}

// Handle incoming message from publisher
wss.on("connection", (ws) => {
  console.log("New connection");
  ws.on("error", console.error);

  ws.on("message", (message) => {
    broadcast(message);
  });

  ws.send("Connection established!");
});

// export { wss };
