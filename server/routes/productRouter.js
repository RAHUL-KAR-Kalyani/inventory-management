const express = require('express');
const { addProduct, getProducts, getProductsById, updateProduct, deleteProduct } = require('../controllers/productControllers');
const isAuth = require('../middleware/isAuth');
const roleMiddleware = require('../middleware/roleMiddleware');
const validateMiddleware = require('../middleware/validateMiddleware');
const { addProductSchema, updateProductSchema } = require('../validations/productValidation');

const productRouter = express.Router();


productRouter.post('/add-product', isAuth, roleMiddleware("admin"),validateMiddleware(addProductSchema), addProduct);
productRouter.get('/get-product', isAuth,getProducts);
productRouter.get('/get-productbyid/:id', isAuth, getProductsById);
productRouter.patch('/update-product/:id', isAuth,validateMiddleware(updateProductSchema), updateProduct);
productRouter.delete('/delete-product/:id', isAuth, roleMiddleware("admin"), deleteProduct);

module.exports = productRouter;