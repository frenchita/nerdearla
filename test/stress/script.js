//script for k6
import http from 'k6/http'
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';


const base_url = "http://localhost:3000"

export let options = {
    vus: 50,
    duration: '30s'
}

export default function () {

    const payload = JSON.stringify({
        q: randomString(3)
      });
    
      const params = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

    http.request('GET', `${base_url}/home/search`, payload, params)
}
