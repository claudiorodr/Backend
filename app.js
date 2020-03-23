var bd = require('./connection')
const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000
const authRoute = require('./routes/auth')
const dotenv = require('dotenv')

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log("Connected to DB"));

app.use(express.json())

app.use('/api/user', authRoute)
app.listen(PORT, () => console.log("Server Up and Running"))