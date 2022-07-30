const express = require('express')
const app = express()
require('dotenv').config()

const logger = require('./middlewares/logger');
const nats = require('./nats/index');


const mongoose = require('mongoose');


app.use(express.json())
app.use(logger)


mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`, {useNewUrlParser: true});
mongoose.connection.once('open', function() {
  console.log("Connection Successful!");
});

mongoose.connection.on('error', err => {
  console.log(err);
  process.exit()
});

const productsSchema = mongoose.Schema({
    title: String,
    price: Number,
    stock: Number
});

const Product = mongoose.model('Product', productsSchema, 'productStore');

app.get('/home/healthcheck', function (req, res) {
    console.log("health check home")
    res.status(200).json({"msj": "hola mundo"})
})

app.get('/home', async function (req, res) {

    let products = await Product.find()
    res.json({products})
}) 

app.get('/home/search', async function (req, res) {
    const {q} = req.body

    let products = await Product.find( { 'title' : { '$regex' : q, '$options' : 'i' } } )
    res.json({products})
}) 

app.listen(process.env.APP_PORT, () => {
    console.log(`Server running on ${process.env.APP_PORT}`)
  }).on('error', function(err) { 
    console.log(err)
    process.exit(1);
});