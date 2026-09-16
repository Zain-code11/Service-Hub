import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import serviceRoutes from './routes/serviceRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'
import userRoutes from './routes/userRoutes.js'
import reviewRoutes from "./routes/reviewRoute.js";
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/auth',authRoutes)
app.use('/api/categories',categoryRoutes)
app.use('/api/services',serviceRoutes)
app.use('/api/bookings',bookingRoutes)
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.get('/api/health',(req,res)=>{
    res.json({
    success: true,
    message: "ServiceHub API is running",
    })
})
export default app