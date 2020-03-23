const router = require('express').Router()
const verify = require('./verifyToken')
router.get('/', verify, (req, res) => {
    res.json({
        posts: {
            title: 'my fisrt post',
            descritpion: 'random data'
        }
    })
})

module.exports = router