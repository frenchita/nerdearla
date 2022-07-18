const express = require('express')
const router = express.Router()
const { Sequelize, Products } = require("../../models")
const Op = Sequelize.Op;


router.get('/', async (req, res) => {
    
    const results = await Products.findAll()
    if(results.length === 0) return res.status(204).json({data: {msj: "no results"}})

    return res.status(200).json({data: {results}})
})

router.get('/search', async (req, res) => {
    console.log(req.body)
    const {q} = req.body

    const results = await Products.findAll({
        where: {
            title: { [Op.substring]: q }
        }
    })

    if(results.length === 0) return res.status(204).json({data: {msj: "no results"}})

    return res.status(200).json({data: {results}})
})


module.exports = router