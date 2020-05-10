var db = require('../connection')
const router = require('express').Router()

// Create a reservation under user_id and restaurant_id
router.post('/new', async (req, res) => {
    var restaurant_id = req.body.restaurant_id
    var user_id = req.body.user_id
    var number_guests = req.body.number_guests
    var date = req.body.date
    var time = req.body.time
    var data = {
        "user_id" : user_id,
        "restaurant_id" : restaurant_id,
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

module.exports = router
