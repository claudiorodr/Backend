var db = require('../connection')
const router = require('express').Router()
const User = require('../model/User')
const {
    registerValidation,
    loginValidation
} = require('../validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.post('/register', async (req, res) => {
    const {
        error
    } = registerValidation(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const emailExist = await User.findOne({
        email: req.body.email
    })
    if (emailExist) {
        return res.status(400).send('Email already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    try {
        const savedUser = await user.save()
        res.send({
            user_id: user._id,
            user_name: user.name,
        })
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/login', async function (req, res) {
    const { error } = loginValidation(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    const user = await User.findOne({
        email: req.body.email
    })

    if (!user) {
        return res.status(400).send('Email or password is wrong')
    }

    const validPass = await bcrypt.compare(req.body.password, user.password)

    if (!validPass) {
        return res.status(400).send('Invalid Password')
    }

    const token = jwt.sign({
        _id: user._id
    }, process.env.TOKEN_SECRET)

    res.header('auth-token', token).send({
        token: token,
        user_id: user.id,
        user_name: user.name
    })

})

router.get('/list', async (req, res) => {
    await db.list('users')
    res.send(db.results)
})

router.get('/popular', async (req, res) => {
    await db.list('users')
    res.send(db.results)
})

module.exports = router