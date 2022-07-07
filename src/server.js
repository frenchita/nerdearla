const express = require('express')
const app = express()
require('dotenv').config()


app.use(express.json())

app.get('/', function (req, res) {
  res.status(200).json({"msj": "hola mundo"})
})


app.listen(process.env.APP_POST, () => {
  console.log(`Running on ${process.env.APP_POST}`)
})

module.exports = app
