var mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    id: Number,
    user_id: Number,
    title: String,
    price: Number,
    stock: Number
});

const Product = mongoose.model('Product', productsSchema, 'productStore');

module.exports = Product