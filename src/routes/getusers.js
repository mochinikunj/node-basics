import AWS from "aws-sdk";
import { Router } from "express";

const router = Router();
router.get("/", async (req, res) => {
  console.log("Get users");

  try {
    const params = {
      TableName: "users-table",
    };
    console.log(params);

    const docClient = new AWS.DynamoDB.DocumentClient();
    const result = await docClient.scan(params).promise();
    console.log("Result:", result);

    return res.send(result.Items);
  } catch (e) {
    console.log("ERROR:", e);
    return res.status(500).send({
      status: "NOK",
      message: e,
    });
  }
});

export default router;
