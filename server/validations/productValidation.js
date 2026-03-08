const { z } = require("zod");

const addProductSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    sku: z.string().min(1, "SKU is required"),
    category: z.string().optional(), // optional
    price: z.coerce.number({ invalid_type_error: "Price must be a number" }),
    stock: z.coerce.number().optional(),
    reorderLevel: z.coerce.number().optional()
});

const updateProductSchema = z.object({
    name: z.string().optional(),
    sku: z.string().optional(),
    category: z.string().optional(),
    price: z.coerce.number().optional(),
    stock: z.coerce.number().optional(),
    reorderLevel: z.coerce.number().optional()
});

module.exports = { addProductSchema, updateProductSchema };