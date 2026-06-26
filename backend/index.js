const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const authRoutes = require('./routes/auth')
const protectedRoutes = require('./routes/protectedRoute')
const favoritesRoutes = require('./routes/favorites')

const app = express()             // 👈 PEHLE app banao
const PORT = process.env.PORT || 5000

app.use(cors({                    // 👈 PHIR use karo
    origin: "*",
    credentials: true
}))

app.use(express.json())
mongoose.set('bufferCommands', false);
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('✅ MongoDB connected successfully!')
})
.catch((error) => {
  console.log('❌ MongoDB connection error:')
  console.log(error.message)
})

app.get('/', (req, res) => {
  res.send("hello server kam kr rha h")
})

app.use('/api/auth', authRoutes)
app.use('/api', protectedRoutes)
app.use('/api/favorites', favoritesRoutes)

app.listen(PORT, () => {
    console.log(`server ${PORT} pe chal rha h`)
    console.log(`Open: http://localhost:${PORT}`)
})