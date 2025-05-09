import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js';
import authRouter from './routes/authRoute.js';
import userRouter from './routes/userRoute.js';
import itemRouter from './routes/itemRoutes.js';

const app = express();

//middleware
app.use(cors())
app.use(express.json())

connectDB({origin:'http://localhost:8081',Credential:true})

app.use('/api/user',authRouter)
app.use('/api/user',userRouter)
app.use('/api/item',itemRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
    console.log('Server is running on port',PORT)
})


