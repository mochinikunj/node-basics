import { Router } from "express";
import AWS from "aws-sdk";

const router = Router();
router.patch("/", async (req, res) => {
  console.log("Update user");

  try {
    const { email, name: updatedName, age: updatedAge } = req.body;
    if (!email || !updatedName || !updatedAge) {
      return res.status(400).send({
        status: "NOK",
        message: "Invalid Request!",
      });
    }

    const params = {
      TableName: "users-table",
      Key: { email },
      UpdateExpression: "set #name = :name, age = :age",
      ExpressionAttributeNames: { "#name": "name" },
      ExpressionAttributeValues: {
        ":name": updatedName,
        ":age": updatedAge,
      },
    };
    console.log(params);

    const docClient = new AWS.DynamoDB.DocumentClient();
    const result = await docClient.update(params).promise();
    console.log("Result:", result);

    return res.send(req.body);
  } catch (e) {
    console.log("ERROR:", e);
    return res.status(500).send({
      status: "NOK",
      message: e,
    });
  }
});

export default router;
