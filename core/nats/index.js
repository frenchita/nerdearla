const nats = require('node-nats-streaming')


/* convertir a clase de JS 

class NatsConnector {
    private _client?: Stan;
  
    get client() {
      if (!this._client) {
        throw new Error("Cannot access NATS Client before connecting!");
      }
      return this._client;
    }
  
    connectToNats(clusterId: string, clientId: string, url: string) {
      this._client = nats.connect(clusterId, clientId, { url });
  
      return new Promise<void>((resolve, reject) => {
        this.client.on("connect", () => {
          console.log(`DUNK SERVICE IS CONNECTED TO NATS STREAMING SERVER`);
          resolve();
        });
        this.client.on("error", (err) => {
          reject(err);
        });
      });
    }
  }

  export const natsConnector = new NatsConnector();

*/
  


  

const { createHmac, randomBytes } = require("crypto")

const stan = nats.connect('nerdearla', 'cosas_client' + randomBytes(6).toString('hex'), {
  url: `http://${process.env.NATS_HOST}:${process.env.NATS_PORT}`,
});

stan.on('connect', async () => {
  console.log('Publisher connected to NATS');
});




module.export = stan