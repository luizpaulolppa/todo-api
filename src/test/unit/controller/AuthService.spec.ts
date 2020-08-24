import req from "supertest";
import app from "../../../app/app";

jest.useFakeTimers();

describe("AuthController", () => {
  it("Sum two numbers", async () => {
    const res = await req(app).get("/");
    console.log(res.body);
    // expect(res.text).toBe("Hello ts-node!");
  });
});
