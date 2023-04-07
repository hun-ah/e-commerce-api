const express = require('express')
const connectDB = require('./config/db')
const app = express()
const PORT = 5000
const cors = require('cors')

// Route variables
const registerRoutes = require('./routes/register')
const loginRoutes = require('./routes/login')
const userRoutes = require('./routes/user')
const productRoutes = require('./routes/product')
const cartRoutes = require('./routes/cart')
const orderRoutes = require('./routes/order')
const stripeRoutes = require('./routes/stripe')

// Middleware...
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes
app.use('/api/register', registerRoutes)
app.use('/api/login', loginRoutes)
app.use('/api/user', userRoutes)
app.use('/api/product', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/checkout', stripeRoutes)

connectDB()
   .then(() => {
      app.listen(process.env.PORT || PORT, () => console.log(`Server is running on ${PORT}`))
   })