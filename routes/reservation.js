var db = require('../connection')
const router = require('express').Router()
const verify = require('./verifyToken')

// Lists all restaurants in BD
router.get('/list', verify, async (req, res) => {
  var page = parseInt(req.query.page)
  var size = parseInt(req.query.size)
  await db.list('reservation', page, size, 'restaurant.name')
  res.send(db.results)
})

module.exports = router