import mqtt from "mqtt";
import { topics, mqttBrokerUrl } from "./../shared.js";

const client = mqtt.connect(`mqtt://${mqttBrokerUrl}`);

client.on("connect", () => {
  client.subscribe(topics.helloWorld, (err) => console.log(err));
});

client.on("message", (topic, msg) => {
  console.log("Received the msg!", topic, msg.toString());
});
