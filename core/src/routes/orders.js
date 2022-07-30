const express = require('express')
const router = express.Router()
const { sequelize, Products, Orders, Order_products } = require("../../models")

const { validate, ValidationError, Joi } = require('express-validation');
const validate_user = require('../../middlewares/validate_users');
const nats = require("../../nats/index")

const validationOrders = {
  body: Joi.object({
    products: Joi.array()
      .required() 
    },
    )
,}

router.use(validate_user)

router.get('/', async (req, res) => {
  res.json(await Orders.findAll({
    where: {
      user_id: req.user.id
    }
  }))
})

router.post('/', validate(validationOrders, {}, {}), async (req, res) => {
  const t = await sequelize.transaction();
  
  try {

    const {products} = req.body
    const order = await Orders.create({ user_id:req.user.id, status:"pending"}, { transaction: t });

    let totalOrder = 0;

    for(let i=0; i<products.length; i++){
        const product = await Products.findOne({where: { id:products[i].product_id }})

        if(!product) throw(`Product_id ${products[i].product_id} invalido`) //rollback db

        let newstock = product.stock - products[i].quantity

        if(newstock < 0) throw(`Stock insuficiente para Product_id ${products[i].product_id}`) //rollback db

        await Order_products.create({ order_id:order.id, product_id:products[i].product_id, quantity:products[i].quantity}, { transaction: t });
        await product.update({stock:newstock}, { transaction: t });

        nats.stan.publish('product:stock', JSON.stringify({id:product.id, stock:newstock}), (err, guid) => {
          if (err) {
            console.log('publish failed: ' + err)
          } else {
            console.log('published message with guid: ' + guid)
          }
        })

        totalOrder += product.price * products[i].quantity;
    };

    order.update({price: totalOrder});

    await t.commit();

    

    res.status(201).json({ data: {
      msj: ` La order ${order.id} ha sido creada`,
      id: order.id
    }
    })
  } catch (error) {
    await t.rollback();
    res.status(400).json({msj: error})  
  }
  
})

router.patch('/', async (req, res) => {
    try {
  
      const {order_id, status} = req.body
      const order = await Orders.findOne({
        where: {
          user_id: req.user.id,
          id: order_id
        }
      })

      if(!order) return res.sendStatus(403);

      await order.update({status:status})
  
      res.json({msj: ` La order ${order.id} ha sido actualizada`})
    } catch (error) {
      res.status(400).json({msj: error})  
    }
    
  })


module.exports = router