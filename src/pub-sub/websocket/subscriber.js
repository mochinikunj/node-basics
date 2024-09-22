import WebSocket from "ws";
import { topics, webSocketServerUrl } from "./../shared.js";

// Connect to WebSocket server
const ws = new WebSocket(`ws://${webSocketServerUrl}`);

// Handle incoming message
ws.on("message", function message(data) {
  console.log("received subscriber:", data.toString());
});
