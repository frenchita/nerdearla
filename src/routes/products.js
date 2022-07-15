const express = require('express')
const router = express.Router()
const { Products } = require("../../models")

const { validate, ValidationError, Joi } = require('express-validation');
const validate_user = require('../../middlewares/validate_users');

const validationProducts = {
  body: Joi.object({
    price: Joi.number()
      .required(),  
    stock: Joi.number()
      .required(),
    title: Joi.string()
      .required()
  })
,}

router.use(validate_user)

router.get('/', async (req, res) => {
  res.json(await Products.findAll({
    where: {
      user_id: req.user.id
    }
  }))
})

router.post('/', validate(validationProducts, {}, {}), async (req, res) => {
  try {

    const {user_id, title, price, stock} = req.body
    const Product = await Products.create({ user_id:req.user.id, title, price, stock});
    res.json({msj: `Product ${Product.title} has been added`})
  } catch (error) {
    res.status(400).json({msj: error})  
  }
  
})


module.exports = router