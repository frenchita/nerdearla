require('dotenv').config()
const nats = require('node-nats-streaming')

console.log(`http://${process.env.NATS_HOST}:${process.env.NATS_PORT}`)

class NatsConnector {

  constructor() {
    const { createHmac, randomBytes } = require("crypto")

    this.stan = nats.connect('nerdearla', 'cosas_client' + randomBytes(6).toString('hex'), {
      url: `http://${process.env.NATS_HOST}:${process.env.NATS_PORT}`,
    });
  }
}

module.exports = new NatsConnector();
