import { Router } from "express";
import AWS from "aws-sdk";
import { compareHash, generateToken } from "./../utils/auth.js";

const router = Router();
router.post("/", async (req, res) => {
  console.log("Sign in");
  try {
    const { email, password } = req.body;

    const params = {
      TableName: "users-table",
      Key: { email },
    };
    console.log(params);

    const docClient = new AWS.DynamoDB.DocumentClient();
    const result = await docClient.get(params).promise();
    console.log("Result:", result);

    const user = result?.Item;
    if (!user?.id) {
      return res.status(404).send("User not found!");
    }
    if (!compareHash(password, user.password)) {
      return res.status(401).send({
        status: "NOK",
        message: "Wrong password!",
      });
    }

    const token = generateToken(user);
    return res.send({ token });
  } catch (e) {
    console.log("ERROR:", e);
    return res.status(500).send({
      status: "NOK",
      message: e,
    });
  }
});

export default router;
