var db = require('../connection')
const router = require('express').Router()

// Create a reservation under user_id and restaurant_id
router.post('/new', async (req, res) => {
    var restaurant_id = req.body.restaurant_id
    var user_id = req.body.user_id
    var restaurant_name = req.body.restaurant_name
    var restaurant_address = req.body.restaurant_address
    var number_guests = req.body.number_guests
    var date = req.body.date
    var time = req.body.time
    var data = {
        "user_id" : user_id,
        "restaurant_id" : restaurant_id,
        "restaurant_name": restaurant_name,
        "restaurant_address": restaurant_address,
        "date" : date,
        "time" : time,
        "number_guests" : number_guests
    }
    await db.insert('reservation', data)
    
    if (!parseInt(number_guests)) {
        res.status(500).send('Please insert number of guests')
    }
    else {
        res.send('Reservation made successfully')
    }
})

router.get('/user', async (req, res) => {
    var user_id = req.query.user_id
    
    await db.find('reservation', 'user_id', user_id)
    res.send(db.results)
})

module.exports = router
