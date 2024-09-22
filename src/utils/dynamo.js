import AWS from "aws-sdk";

let docClient;
function getDocClient() {
  if (!docClient) {
    docClient = new AWS.DynamoDB.DocumentClient();
  }
  return docClient;
}
export { getDocClient };
