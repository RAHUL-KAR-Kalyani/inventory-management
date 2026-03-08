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
const productModel = require("../models/productModel");

describe("Invoice API", () => {

    let invoiceId;
    let customerId;    
    let productId;

    beforeAll(async () => {

        const customer = await customerModel.create({
            name: "Invoice Customer",
            phone: "999999" + Date.now(),
            email: `test${Date.now()}@gmail.com`,
            GSTIN: "GST" + Date.now()
        });

        customerId = customer._id;

        const product = await productModel.create({
            name: "Phone",
            sku: "PH" + Date.now(),
            category: "Electronics",
            price: 10000,
            stock: 50,
            reorderLevel: 5
        });

        productId = product._id;
    });

    test("POST /invoice/create-invoice", async () => {

        const res = await request(app)
            .post("/invoice/create-invoice")
            .send({
                customer: customerId,
                items: [
                    {
                        product: productId,
                        quantity: 2
                    }
                ],
                paymentStatus: "paid"
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);

        invoiceId = res.body.invoice._id;
    });

    test("GET /invoice/get-invoice", async () => {
        const res = await request(app)
            .get("/invoice/get-invoice");

        expect(res.statusCode).toBe(200);
    });

    test("GET /invoice/get-invoicebyid/:id", async () => {
        const res = await request(app)
            .get(`/invoice/get-invoicebyid/${invoiceId}`);

        expect(res.statusCode).toBe(200);
    });

    test("PATCH /invoice/update-invoice/:id", async () => {
        const res = await request(app)
            .patch(`/invoice/update-invoice/${invoiceId}`)
            .send({
                paymentStatus: "paid"
            });

        expect(res.statusCode).toBe(200);
    });

    test("DELETE /invoice/delete-invoice/:id", async () => {
        const res = await request(app)
            .delete(`/invoice/delete-invoice/${invoiceId}`);

        expect(res.statusCode).toBe(200);
    });

});
