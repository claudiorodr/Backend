var db = require('../connection')
const router = require('express').Router()

// Lists all restaurants in BD
router.get('/list', (req, res) => {
  console.log(db.list('restaurants'))
})

// Find restaurant via id
router.get('/find/:id', (req, res) => {
  var id = req.params.id;
  console.log(db.findOne('restaurants', 'restaurant.id', id))
})

// List restaurant via city
router.get('/city/:id', (req, res) => {
  var id = req.params.id;
  id = parseInt(id)
  console.log(db.find('restaurants', 'restaurant.location.city_id', id))
})

// List all restaurant via rating
router.get('/rating', (req, res) => {
  console.log(db.sort('restaurants', 'restaurant.user_rating.aggregate_rating'))
})

// List all restaurant via price tag
router.get('/price/:id', (req, res) => {
  var id = req.params.id;
  id = parseInt(id)
  console.log(db.list('restaurants', 'restaurant.price_range', id))
})

// List restaurants by popularity
router.get('/popular', (req, res) => {
  console.log(db.sort('restaurants', 'restaurant.user_rating.votes'))
})




module.exports = router