require("dotenv").config();
const mongoose = require("mongoose");

jest.mock("./middleware/isAuth", () => {
    return (req, res, next) => {
        req.user = {
            _id: "507f191e810c19729de860ea",
            role: "admin"
        };
        next();
    };
});

jest.mock("./middleware/roleMiddleware", () => {
    return () => (req, res, next) => next();
});

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});


afterAll(async () => {
    await mongoose.connection.close();
});
