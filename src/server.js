const express = require('express')
const app = express()
require('dotenv').config()


app.use(express.json())

app.get('/', function (req, res) {
  res.status(200).json({"msj": "hola mundo"})
})

/* routes */
/* users */

const users = require('./routes/users')
app.use('/users', users)


app.listen(process.env.APP_PORT, () => {
  console.log(`Server running on ${process.env.APP_PORT}`)
}).on('error', function(err) { 
  console.log(err)
  process.exit(1);
});

module.exports = app
