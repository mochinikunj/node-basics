import supertest from "supertest";
import app from "../../app";

describe("healthcheck", () => {
  it("Should perform a successful healthcheck", async () => {
    const response = await supertest(app).get("/healthcheck");
    expect(response.statusCode).toBe(200);
  });
});
