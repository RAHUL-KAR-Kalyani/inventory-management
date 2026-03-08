const request = require("supertest");
const app = require("../app");
const userModel = require("../models/userModel");

describe("Auth API", () => {

    let email = `rahul${Date.now()}@test.com`;
    let userId;

    test("POST /user/register", async () => {

        const res = await request(app)
            .post("/user/register")
            .send({
                name: "Rahul",
                email,
                password: "123456",
                role: "admin"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);

        const user = await userModel.findOne({ email });
        userId = user._id;

        global.userId = userId;
    });
    

    test("POST /user/register email exists", async () => {

        const email = `rahul${Date.now()}@test.com`;

        await userModel.create({
            name: "Rahul",
            email,
            password: "123456",
            role: "admin"
        });

        const res = await request(app)
            .post("/user/register")
            .send({
                name: "Rahul",
                email,
                password: "123456",
                role: "admin"
            });

        expect(res.statusCode).toBe(400);
    });


    test("POST /user/login", async () => {

        const res = await request(app)
            .post("/user/login")
            .send({
                email,
                password: "123456",
                role: "admin"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
    });


    test("GET /user/profile", async () => {

        const res = await request(app).get("/user/profile");

        console.log(res.body);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
    });


    test("GET /user/logout", async () => {

        const res = await request(app).get("/user/logout");

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
    });

});
