import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: "ap-south-1",
});

const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  const task = {
    TaskId: Date.now().toString(),
    Title: "My First Task",
    Status: "Pending",
  };

  await docClient.send(
    new PutCommand({
      TableName: "Tasks",
      Item: task,
    })
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Task Added Successfully",
      task,
    }),
  };
};