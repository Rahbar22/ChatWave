const express = require('express')
const chat = require('./data/chats')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const { notFound, errorHandler } = require('./middleware/ErrorMiddleware')

dotenv.config()
const app = express()

app.use(express.json())

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server started on port ${PORT}`))