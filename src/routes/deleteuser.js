import { Router } from "express";
import AWS from "aws-sdk";

const router = Router();
router.delete("/", async (req, res) => {
  console.log("Delete user");

  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send({
        status: "NOK",
        message: "Invalid Request!",
      });
    }

    const params = {
      TableName: "users-table",
      Key: { email },
    };
    console.log(params);

    const docClient = new AWS.DynamoDB.DocumentClient();
    const result = await docClient.delete(params).promise();
    console.log("Result:", result);

    return res.send({
      status: "OK",
      message: "User deleted.",
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
