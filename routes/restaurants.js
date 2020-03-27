var db = require('../connection')
const router = require('express').Router()

// Lists all restaurants in BD
router.get('/list', (req, res) => {
  db.list('restaurants')
  res.send(db.results)
})

// Find restaurant via id
router.get('/find/:id', (req, res) => {
  var id = req.params.id;
  db.findOne('restaurants', 'restaurant.id', id)
  res.send(db.results)
})

// List restaurant via city
router.get('/city/:id', (req, res) => {
  var id = req.params.id;
  id = parseInt(id)
  db.find('restaurants', 'restaurant.location.city_id', id)
  res.send(db.results)
})

// List all restaurant via rating
router.get('/rating', (req, res) => {
  db.sort('restaurants', 'restaurant.user_rating.aggregate_rating')
  res.send(db.results)
})

// List all restaurant via price tag
router.get('/price/:id', (req, res) => {
  var id = req.params.id;
  id = parseInt(id)
  db.list('restaurants', 'restaurant.price_range', id)
  res.send(db.results)
})

// List restaurants by popularity
router.get('/popular', (req, res) => {
  db.sort('restaurants', 'restaurant.user_rating.votes')
  res.send(db.results)
})

module.exports = router