const express = require('express')
const dotenv = require('dotenv').config()
const userRouter = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoute')
const { notFound,errorHandler } = require('./middlewares/errorMiddleware')


const app = express()
app.use(express.json())

app.use('/api/users',userRouter)
app.use('/api/products',productRoutes)


const PORT = process.env.PORT ||8000

app.get('/',(_,res)=>res.send("Hello I am from backend."))

app.use(notFound)
app.use(errorHandler)

app.listen(PORT,()=>console.log(`Server Listen to port ${process.env.PORT}`))