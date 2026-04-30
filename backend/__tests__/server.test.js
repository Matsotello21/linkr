// const add = require('./server.js');
// test('first test', ()=>{
//     expect(add()).toBe(5)
// });

// Import supertest and the app
const supertest = require('supertest')
const app = require('../server')


//describe groups together related tests
describe('Url API', () =>{
    test('health endpoint returns status ok', async () =>{
        const response = await supertest(app).get('/health')

        expect (response.status).toBe (200)
        expect (response.body.status).toBe('ok')
    })
    test('Submitting a valid URL returns a short ID', async () =>{
        const response = await supertest(app)
            .post('/submit')
            .send({targetUrl: 'https://google.com'})
        expect (response.status).toBe(200)
        expect(response.body.shortID).toBeDefined()
        expect(response.body.savedLink).toBe('https://google.com')
    })
    test('Submiting with no URL',async () => {
        const response = await supertest(app)
            .post('/submit')
            .send({ })
        expect(response.status).toBe(400)
        expect(response.body.error).toBe("url is required")
    })
})