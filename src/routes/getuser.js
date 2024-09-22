import AWS from "aws-sdk";
import { Router } from "express";

const router = Router();
router.post("/", async (req, res) => {
  console.log("Get user");

  try {
    const { email } = req.body;

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

    return res.send(user);
  } catch (e) {
    console.log("ERROR:", e);
    return res.status(500).send({
      status: "NOK",
      message: e,
    });
  }
});

export default router;
