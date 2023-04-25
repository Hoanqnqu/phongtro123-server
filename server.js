import express from 'express'
require('dotenv').config()
import initRoutes from './src/routes'
import cors from 'cors'
import {stringToDate} from './src/ultis/generateCode'
import connectDB from './src/config/connectDB'

const app = express()
app.use(cors({
    origin:process.env.CLIENT_URL,
    methods:['POST','GET','PUT', 'DELETE']
}))
app.use(express.json({limit:'10mb'}))
app.use(express.urlencoded({extended: true, limit:'10mb'}))

initRoutes(app)
connectDB()
const port = process.env.PORT||8000
const listener = app.listen(port,()=>{
    console.log((`sever is running on port ${listener.address().port}`));
})