jest.mock("../middleware/isAuth", () => {
    return (req, res, next) => {
        req.user = { _id: "testuserid", role: "admin" };
        next();
    };
});

jest.mock("../middleware/roleMiddleware", () => {
    return () => (req, res, next) => next();
});

const request = require("supertest");
const app = require("../app");
const productModel = require("../models/productModel");

describe("Dashboard API", () => {

    test("GET /dashboard", async () => {

        const res = await request(app).get("/dashboard");

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);

    });

    test("GET /dashboard should handle server error", async () => {

        // Force error
        jest.spyOn(productModel, "find").mockImplementationOnce(() => {
            throw new Error("DB Error");
        });

        const res = await request(app).get("/dashboard");

        expect(res.statusCode).toBe(500);
        expect(res.body.success).toBe(false);

    });

});



