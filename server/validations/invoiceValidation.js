const { z } = require("zod");

// Item schema for each product in invoice
const invoiceItemSchema = z.object({
    product: z.string().min(1, "Product ID is required"),
    quantity: z.number().min(1, "Quantity must be at least 1")
});

// Create Invoice validation
const createInvoiceSchema = z.object({
    customer: z.string().min(1, "Customer ID is required"),
    items: z.array(invoiceItemSchema).min(1, "At least one item is required"),
    cgst: z.number().optional().default(9),
    sgst: z.number().optional().default(9),
    discount: z.number().optional().default(0),
    paymentStatus: z.string().optional(),
    paymentMethod: z.string().optional().default("cash")
});

// Update Invoice validation
const updateInvoiceSchema = z.object({
    customer: z.string().optional(),
    items: z.array(invoiceItemSchema).optional(),
    cgst: z.number().optional(),
    sgst: z.number().optional(),
    discount: z.number().optional(),
    paymentStatus: z.string().optional(),
    paymentMethod: z.string().optional()
});

module.exports = { createInvoiceSchema, updateInvoiceSchema };