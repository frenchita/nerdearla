const express = require('express')
const router = express.Router()
const { Sequelize, Products } = require("../../models")
const Op = Sequelize.Op;


router.get('/', async (req, res) => {
  res.json(await Products.findAll())
})

router.get('/search', async (req, res) => {
    const {q} = req.body

    res.json(await Products.findAll({
        where: {
            title: { [Op.substring]: q }
        }
    })
    )
})


module.exports = router