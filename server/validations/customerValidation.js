const { z } = require("zod");

// Add Customer Validation
const addCustomerSchema = z.object({
    name: z.string().min(1, "Customer name is required"),
    phone: z.string().min(1, "Phone number is required"),
    email: z.string().email("Invalid email").optional(),
    address: z.string().optional(),
    GSTIN: z.string().optional()
});

const getCustomerSchema = z.object({
    // No fields required for fetching all customers, but can add filters if needed
    
});

// Update Customer Validation (all fields optional for partial update)
const updateCustomerSchema = z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email("Invalid email").optional(),
    address: z.string().optional(),
    GSTIN: z.string().optional()
});

module.exports = { addCustomerSchema, updateCustomerSchema };