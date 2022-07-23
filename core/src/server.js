const express = require('express')
const app = express()
require('dotenv').config()
const { validate, ValidationError, Joi } = require('express-validation')


app.use(express.json())

app.get('/', function (req, res) {
  console.log("health check")
  res.status(200).json({"msj": "hola mundo"})
})

/* routes */
/* users */

const users = require('./routes/users')
app.use('/users', users)

const products = require('./routes/products')
app.use('/products', products)

const orders = require('./routes/orders')
app.use('/orders', orders)

const home = require('./routes/home')
app.use('/home', home)



app.use(function(err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err)
  }

  return res.status(500).json(err)
})

app.listen(process.env.APP_PORT, () => {
  console.log(`Server running on ${process.env.APP_PORT}`)
}).on('error', function(err) { 
  console.log(err)
  process.exit(1);
});

module.exports = app
