import express from 'express'
import { login, register } from '../controllers/authController.js';

const authRouter = express.Router ();

authRouter.post('/signup',register)
authRouter.post('/signin',login)

export default authRouter;