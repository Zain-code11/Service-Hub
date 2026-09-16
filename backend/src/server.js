import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
console.log(__filename)
const __dirname = path.dirname(__filename)
dotenv.config({path: path.join(__dirname, '../.env')})

import app from './app.js'
import connectDB from './config/db.js'
import dns from 'dns'
dns.setServers(['8.8.8.8', '1.1.1.1'])
const PORT = process.env.PORT || 5000
connectDB().then(()=>{
app.listen(PORT,()=>{
    console.log(`Server Running on Port ${PORT}`)
})
})
