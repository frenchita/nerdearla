const express = require('express')
const router = express.Router()
const { Products } = require("../../models")
const nats = require("../../nats/index")

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
//  try {
  

    const {user_id, title, price, stock} = req.body

    const data = { user_id:req.user.id, title, price, stock}
    const Product = await Products.create(data);

    nats.stan.publish('product:add', JSON.stringify(data), (err, guid) => {
      if (err) {
        console.log('publish failed: ' + err)
      } else {
        console.log('published message with guid: ' + guid)
      }
    })


    res.status(201).json( { data: {
        msj: `Product ${Product.title} has been added`,
        id: Product.id 
      }
    })
/*  } catch (error) {
    res.status(400).json({msj: error})  
  } */
  
})


module.exports = router