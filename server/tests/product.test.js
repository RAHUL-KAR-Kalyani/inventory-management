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

describe("Product API", () => {

    let productId;

    test("POST /product/add-product", async () => {

        const res = await request(app)
            .post("/product/add-product")
            .send({
                name: "Laptop",
                sku: "LAP" + Date.now(),
                category: "Electronics",
                price: 50000,
                stock: 10,
                reorderLevel: 10
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);

        productId = res.body.product._id;
    });


    test("GET /product/get-product", async () => {

        const res = await request(app)
            .get("/product/get-product");

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
    });


    test("GET /product/get-productbyid/:id", async () => {

        const res = await request(app)
            .get(`/product/get-productbyid/${productId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
    });


    test("PATCH /product/update-product/:id", async () => {

        const res = await request(app)
            .patch(`/product/update-product/${productId}`)
            .send({ price: 55000 });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
    });


    test("DELETE /product/delete-product/:id", async () => {

        const res = await request(app)
            .delete(`/product/delete-product/${productId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
    });

});