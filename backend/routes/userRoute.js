import express from 'express'
import { getUserDetails } from '../controllers/userController.js'
import { auth } from '../middlewares/authMiddleware.js';

const userRouter = express.Router()

userRouter.get('/user',auth,getUserDetails)

export default userRouter;