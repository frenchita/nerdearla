const express = require('express')
const app = express()
require('dotenv').config()

app.use(express.json())

app.get('/home/healthcheck', function (req, res) {
    console.log("health check home")
    res.status(200).json({"msj": "hola mundo"})
})

app.listen(process.env.APP_PORT, () => {
    console.log(`Server running on ${process.env.APP_PORT}`)
  }).on('error', function(err) { 
    console.log(err)
    process.exit(1);
});