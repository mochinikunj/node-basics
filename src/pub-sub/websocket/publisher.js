import WebSocket from "ws";
import { topics, webSocketServerUrl } from "./../shared.js";

// Connect to WebSocket server
const ws = new WebSocket(`ws://${webSocketServerUrl}`);

ws.on("error", console.error);

// Publish message to a topic
ws.on("open", function open() {
  setInterval(() => ws.send("Hello World!"), 5000);
});

ws.on("message", function message(data) {
  console.log("received publisher:", data.toString());
});

console.log("Message published!");
