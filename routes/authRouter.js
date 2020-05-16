import { Router } from 'express';
import loginSchema from '../http/validations/loginSchema';
import validationMiddleware from '../http/middlewares/validationMiddleware';
import asyncMiddleware from '../http/middlewares/asyncMiddleware';
import authController from '../http/controllers/authController';

const authRouter = Router();

/**
 * @router  /POST api/auth
 * @desc    Authenticates a user
 * @access  Public
 */
authRouter.post(
  '/',
  validationMiddleware(loginSchema),
  asyncMiddleware(authController.login),
);

export default authRouter;
