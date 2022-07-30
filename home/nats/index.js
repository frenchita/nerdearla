require('dotenv').config()
const nats = require('node-nats-streaming')
const Product = require("../models/product")



class NatsConnector {

  constructor() {
    const { createHmac, randomBytes } = require("crypto")

    this.stan = nats.connect('nerdearla', 'cosas_client' + randomBytes(6).toString('hex'), {
      url: `http://${process.env.NATS_HOST}:${process.env.NATS_PORT}`,
    });

    this.stan.on('connect', async () => {

      this.stan.subscribe('product:add').on('message', (msg) => {
        const data = JSON.parse(msg.getData())
        new Product({title:data.title, price:data.price, stock:data.stock }).save();
      }) 

    });

  }
}

module.exports = new NatsConnector();
