const validateMiddleware = require("../middleware/validateMiddleware");
const { registerSchema } = require("../validations/userValidation");

describe("validateMiddleware", () => {

    test("should return 400 when validation fails", () => {

        const req = { body: {} };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const next = jest.fn();

        validateMiddleware(registerSchema)(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                success: false
            })
        );
    });

});