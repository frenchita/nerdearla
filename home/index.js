const express = require('express')
const app = express()
require('dotenv').config()

const mongoose = require('mongoose');


app.use(express.json())

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

app.get('/home', async function (req, res) {

    let products = await Product.find()
    res.json({products})
}) 

app.get('/home/search', async function (req, res) {
    const {q} = req.body

    let products = await Product.find( { 'title' : { '$regex' : q, '$options' : 'i' } } )
    res.json({products})
}) 

app.post('/products', function (req, res) {
    try {
      
        const {title, price, stock} = req.body
        const data = {title, price, stock}

        new Product(data).save();
    
        res.status(201).send({data: {msj: "Product añadido"}});
    
    } catch (error) {
        console.log(error)
    }
  
})


app.listen(process.env.APP_PORT, () => {
    console.log(`Server running on ${process.env.APP_PORT}`)
  }).on('error', function(err) { 
    console.log(err)
    process.exit(1);
});