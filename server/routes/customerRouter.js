const express = require('express');
const isAuth = require('../middleware/isAuth');
const roleMiddleware = require('../middleware/roleMiddleware');
const { addCustomer, getCustomer, getCutsomerById, updateCustomer, deleteCustomer } = require('../controllers/customerControllers');
const validateMiddleware = require('../middleware/validateMiddleware');
const { addCustomerSchema, updateCustomerSchema } = require('../validations/customerValidation');

const customerRouter = express.Router();


customerRouter.post('/add-customer', isAuth, roleMiddleware(["admin", "staff"]), validateMiddleware(addCustomerSchema), addCustomer);
customerRouter.get('/get-customer', isAuth, roleMiddleware(["admin", "staff"]), getCustomer);
customerRouter.get('/get-customerbyid/:id', isAuth, roleMiddleware(["admin", "staff"]), getCutsomerById);
customerRouter.patch('/update-customer/:id', isAuth, roleMiddleware(["admin", "staff"]), validateMiddleware(updateCustomerSchema), updateCustomer);
customerRouter.delete('/delete-customer/:id', isAuth, roleMiddleware(["admin", "staff"]), deleteCustomer);


module.exports = customerRouter;
