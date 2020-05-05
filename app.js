const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const restaurantsRoute = require('./routes/restaurants')
const reservationsRoute = require('./routes/reservation')
const PORT = process.env.PORT || 3001

const app = express()
dotenv.config();

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log("Connected to DB"));

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

app.use('/api/users', authRoute)
app.use('/api/restaurants', restaurantsRoute)
app.use('/api/reservation', reservationsRoute)
app.use('/api/posts', postRoute)
app.listen(PORT, () => console.log("Server Up and Running"))