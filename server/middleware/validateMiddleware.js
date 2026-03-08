const validateMiddleware = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        // Return first error message
        return res.status(400).json({
            // message: result.error.errors[0].message,
            // message: result.error.errors.map(e => e.message),
            message: result.error.issues.map(e => e.message),
            success: false
        });
    }
    // Attach validated data to req
    req.body = result.data;
    next();
};

module.exports = validateMiddleware;