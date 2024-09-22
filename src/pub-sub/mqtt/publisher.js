import mqtt from "mqtt";
import { topics, mqttBrokerUrl } from "./../shared.js";

const client = mqtt.connect(`mqtt://${mqttBrokerUrl}`);

client.on("connect", () => {
  setInterval(() => {
    client.publish(topics.helloWorld, "Hello World!");
    console.log("Published the msg!");
  }, 5000);
});
