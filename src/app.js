import AWS from "aws-sdk";
import express from "express";
import signup from "./routes/signup.js";
import signin from "./routes/signin.js";
import getusers from "./routes/getusers.js";
import getuser from "./routes/getuser.js";
import updateuser from "./routes/updateuser.js";
import deleteuser from "./routes/deleteuser.js";
import { auth } from "./utils/auth.js";

AWS.config.update({
  region: process.env.AWS_REGION || "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "YOUR_AWS_ACCESS_KEY_ID",
    secretAccessKey:
      process.env.AWS_SECRET_ACCESS_KEY || "YOUR_AWS_SECRET_ACCESS_KEY",
  },
});

const app = express();
app.use(express.json());

app.get("/health-check", (req, res) => {
  console.log("Health check");
  res.send({
    status: "OK",
    message: "Server is up and healthy.",
  });
});

app.use("/signup", signup);
app.use("/signin", signin);
app.use("/getusers", auth, getusers);
app.use("/getuser", auth, getuser);
app.use("/updateuser", auth, updateuser);
app.use("/deleteuser", auth, deleteuser);

export default app;
