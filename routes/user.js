const express = require('express')
const router = express.Router()
module.exports = router

router.get('/login', (req, res) => {
    res.send('Login')
})

router.get('/register', (req, res) => {
    res.send('Register')
})