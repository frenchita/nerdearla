const express = require('express')
const router = express.Router()

// define the home page route
router.get('/', (req, res) => {
  res.send('hola mundo users')
})
// define the about route
router.post('/', (req, res) => {
  res.send('hola mundo post de users')
})

module.exports = router