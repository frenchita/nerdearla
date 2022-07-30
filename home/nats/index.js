require('dotenv').config()
const nats = require('node-nats-streaming')

console.log(`WORKING IN PROGRESS`)
console.log(`http://${process.env.NATS_HOST}:${process.env.NATS_PORT}`)

class NatsConnector {

  constructor() {
    const { createHmac, randomBytes } = require("crypto")

    this.stan = nats.connect('nerdearla', 'cosas_client' + randomBytes(6).toString('hex'), {
      url: `http://${process.env.NATS_HOST}:${process.env.NATS_PORT}`,
    });

    this.stan.on('connect', async () => {

      this.stan.subscribe('product:add').on('message', (msg) => {
        const data = JSON.parse(msg.getData())
        console.log("agregado DB de buscador: " + msg.getData())
        
        //new Cosa(data).save();
      }) 

    });

  }
}

module.exports = new NatsConnector();
