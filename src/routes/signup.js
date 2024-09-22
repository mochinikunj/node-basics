import AWS from "aws-sdk";
import crypto from "crypto";
import { Router } from "express";
import { createHash } from "./../utils/auth.js";

const router = Router();
router.put("/", async (req, res) => {
  console.log("Sign up");

  const newUser = req.body;
  if (!newUser?.email || !newUser?.password || !newUser?.name) {
    return res.status(400).send({
      status: "NOK",
      message: "Invalid Request!",
    });
  }

  // write code to check if email already exists in db, if exists then throw error

  newUser.id = crypto.randomUUID();
  newUser.password = createHash(newUser.password);

  try {
    const params = {
      TableName: "users-table",
      Item: { ...newUser },
    };
    console.log(params);

    const docClient = new AWS.DynamoDB.DocumentClient();
    const result = await docClient.put(params).promise();
    console.log("Result:", result);

    return res.send({
      status: "OK",
      message: "User created.",
    });
  } catch (e) {
    console.log("ERROR:", e);
    return res.status(500).send({
      status: "NOK",
      message: e,
    });
  }
});

export default router;
