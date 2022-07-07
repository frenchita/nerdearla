const request = require('supertest')
const app = require('../src/server')

describe('Server Ready', () => {
  it('/ 200', async () => {
    const res = await request(app)
      .get('/')
      expect(res.statusCode).toEqual(200);
  })

})
