import supertest from "supertest";
import AWS from "aws-sdk";
import AWSMock from "aws-sdk-mock";
import app from "../../app";
import { MOCKED_USERS } from "./../__fixtures__/getuser.mocks";

const DYNAMODB_DOCUMENTCLIENT = "DynamoDB.DocumentClient";

jest.mock("../../utils/auth", () => {
  const originalModule = jest.requireActual("../../utils/auth");
  return {
    ...originalModule,
    auth: jest.fn((req, res, next) => {
      return next();
    }),
  };
});

describe("getUser", () => {
  afterEach(() => {
    AWSMock.restore(DYNAMODB_DOCUMENTCLIENT);
  });
  it("Should get all users from the db", async () => {
    AWSMock.setSDKInstance(AWS);
    AWSMock.mock(DYNAMODB_DOCUMENTCLIENT, "scan", (_params, callback) => {
      callback(null, { Items: MOCKED_USERS });
    });

    const response = await supertest(app).get("/getusers");
    expect(response.statusCode).toBe(200);
  });

  it("Should get all users from the db", async () => {
    AWSMock.setSDKInstance(AWS);
    AWSMock.mock(DYNAMODB_DOCUMENTCLIENT, "scan", (_params, callback) => {
      callback("error", null);
    });

    const response = await supertest(app).get("/getusers");
    expect(response.statusCode).toBe(500);
  });
});
