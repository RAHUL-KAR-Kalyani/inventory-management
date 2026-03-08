const express = require('express');
const isAuth = require('../middleware/isAuth');
const { createInvoice, getInvoices, getInvoiceById, updateInvoice, deleteInvoice } = require('../controllers/invoiceControllers');
const validateMiddleware = require('../middleware/validateMiddleware');
const { createInvoiceSchema, updateInvoiceSchema } = require('../validations/invoiceValidation');

const invouceRouter = express.Router();

invouceRouter.post('/create-invoice', isAuth, validateMiddleware(createInvoiceSchema), createInvoice);
invouceRouter.get('/get-invoice', isAuth, getInvoices);
invouceRouter.get('/get-invoicebyid/:id', isAuth, getInvoiceById);
invouceRouter.patch('/update-invoice/:id', isAuth, validateMiddleware(updateInvoiceSchema), updateInvoice);
invouceRouter.delete('/delete-invoice/:id', isAuth, deleteInvoice);

module.exports = invouceRouter;