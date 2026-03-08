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
const customerModel = require("../models/customerModel");

afterEach(() => {
    jest.restoreAllMocks();
});

let customerId;

describe("Customer Routes", () => {

    test("Create Customer", async () => {

        const res = await request(app)
            .post("/customer/add-customer")
            .send({
                name: "Test Customer",
                // name:`Test Customer ${Math.floor(Math.random() * 199999)}`,
                phone: "999999" + Date.now(),
                email: `test${Date.now()}@gmail.com`,
                GSTIN: "GST" + Date.now()
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);

        customerId = res.body.customer._id;
    });

    test("Create Customer - phone already exists", async () => {

        jest.spyOn(customerModel, "findOne").mockResolvedValueOnce({
            _id: "507f191e810c19729de860ea",
            phone: "8888888888"
        });

        const res = await request(app)
            .post("/customer/add-customer")
            .send({
                name: "Customer1",
                phone: "8888888888",
                email: "test@test.com"
            });

        expect(res.statusCode).toBe(409);
        expect(res.body.success).toBe(false);
    });

    test("Create Customer - server error", async () => {

        jest.spyOn(customerModel, "findOne").mockRejectedValueOnce(new Error("DB Error"));

        const res = await request(app)
            .post("/customer/add-customer")
            .send({
                name: "Server Error Customer",
                phone: "777777" + Date.now(),
                email: "server@test.com"
            });

        expect(res.statusCode).toBe(500);
        expect(res.body.success).toBe(false);
    });


    test("Get All Customers", async () => {

        const res = await request(app)
            .get("/customer/get-customer");

        expect(res.statusCode).toBe(200);
    });

    test("Get Customer - no customer found", async () => {

        jest.spyOn(customerModel, "find").mockReturnValue({
            sort: jest.fn().mockResolvedValueOnce([])
        });

        const res = await request(app)
            .get("/customer/get-customer");

        expect(res.statusCode).toBe(404);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe("No customer found");
    });

    test("Get All Customers - server error", async () => {

        jest.spyOn(customerModel, "find").mockReturnValue({
            sort: jest.fn().mockRejectedValueOnce(new Error("DB Error"))
        });

        const res = await request(app)
            .get("/customer/get-customer");

        expect(res.statusCode).toBe(500);
        expect(res.body.success).toBe(false);
    });


    test("Get Customer By ID", async () => {

        const res = await request(app)
            .get(`/customer/get-customerbyid/${customerId}`);

        expect(res.statusCode).toBe(200);
    });

    test("Get Customer By Invalid ID", async () => {

        const res = await request(app)
            .get("/customer/get-customerbyid/507f191e810c19729de860aa");

        expect(res.statusCode).toBe(404);
        expect(res.body.success).toBe(false);
    });

    test("Get Customer By ID - server error", async () => {

        jest.spyOn(customerModel, "findById")
            .mockRejectedValueOnce(new Error("DB Error"));

        const res = await request(app)
            .get("/customer/get-customerbyid/507f191e810c19729de860ea");

        expect(res.statusCode).toBe(500);
        expect(res.body.success).toBe(false);
    });

    test("Update Customer", async () => {

        const res = await request(app)
            .patch(`/customer/update-customer/${customerId}`)
            .send({
                name: "Updated Customer"
            });

        expect(res.statusCode).toBe(200);
    });

    test("Update Customer - not found", async () => {

        const res = await request(app)
            .patch("/customer/update-customer/507f191e810c19729de860aa")
            .send({ name: "No Customer" });

        expect(res.statusCode).toBe(404);
        expect(res.body.success).toBe(false);
    });

    test("Update Customer - server error", async () => {

        jest.spyOn(customerModel, "findByIdAndUpdate")
            .mockRejectedValueOnce(new Error("DB Error"));

        const res = await request(app)
            .patch("/customer/update-customer/507f191e810c19729de860ea")
            .send({
                name: "Updated Name"
            });

        expect(res.statusCode).toBe(500);
        expect(res.body.success).toBe(false);
    });


    test("Delete Customer", async () => {

        const res = await request(app)
            .delete(`/customer/delete-customer/${customerId}`);

        expect(res.statusCode).toBe(200);
    });

    test("Delete Customer - not found", async () => {

        const res = await request(app)
            .delete("/customer/delete-customer/507f191e810c19729de860aa");

        expect(res.statusCode).toBe(404);
        expect(res.body.success).toBe(false);
    });

    test("Delete Customer - server error", async () => {

        jest.spyOn(customerModel, "findByIdAndDelete")
            .mockRejectedValueOnce(new Error("DB Error"));

        const res = await request(app)
            .delete("/customer/delete-customer/507f191e810c19729de860ea");

        expect(res.statusCode).toBe(500);
        expect(res.body.success).toBe(false);
    });

});

