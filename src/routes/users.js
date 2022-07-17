const express = require('express')
const router = express.Router()
const { User } = require("../../models")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
require('dotenv').config()


const { validate, ValidationError, Joi } = require('express-validation')

const validationUsers = {
  body: Joi.object({
    firstname: Joi.string()
      .required(),
    lastname: Joi.string()
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  })
,}


router.get('/', async (req, res) => {
  res.json(await User.findAll())
})

router.post('/', validate(validationUsers, {}, {}), async (req, res) => {
  try {
    const {firstname, lastname, email, password} = req.body
    const salt = Math.floor(Math.random() * 6) + 1
    const hash = bcrypt.hashSync(password, salt);
    const user = await User.create({ firstname, lastname, email, password:hash, salt});
    const token = jwt.sign({id: user.id, firstname: user.firstname, lastname: user.lastname}, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24});
    
    res.status(201).json({data: {token}})
  } catch (error) {
    res.status(400).json({msj: error})  
  }
  
})


module.exports = router