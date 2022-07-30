var mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    title: String,
    price: Number,
    stock: Number
});

const Product = mongoose.model('Product', productsSchema, 'productStore');

module.exports = Product