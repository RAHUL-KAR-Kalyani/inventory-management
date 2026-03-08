const request = require("supertest");
const app = require("../app");

describe("App root route", () => {

    test("GET / should return server running message", async () => {
        const res = await request(app).get("/");

        expect(res.statusCode).toBe(200);
        expect(res.text).toBe("Server is running...........");
    });

});