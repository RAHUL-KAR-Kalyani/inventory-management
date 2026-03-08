const express = require('express');
const { registerController, loginController, profileController, logoutController } = require('../controllers/userControllers');
const isAuth = require('../middleware/isAuth');
const validateMiddleware = require('../middleware/validateMiddleware');
const { registerSchema, loginSchema } = require('../validations/userValidation');

const authRouter = express.Router();

authRouter.post('/register', validateMiddleware(registerSchema), registerController);
authRouter.post('/login', validateMiddleware(loginSchema), loginController);
authRouter.get('/profile', isAuth, profileController);
authRouter.get('/logout', isAuth, logoutController);

module.exports = authRouter;