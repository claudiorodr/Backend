var bd = require('./connection')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.use('/', require('./routes/index'))
app.use('/user', require('./routes/user'))
app.listen(PORT, () => console.log(`Example app listening on port port!: ` + "http://127.0.0.1:3000"))
