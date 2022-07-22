const should = require('should');
const itParam = require('mocha-param');
const supertest = require('supertest')
let testUrl = supertest('https://jsonplaceholder.typicode.com');


describe('Example: jsonplaceholder', () => {
    it('Verify GET Users request',    async () => {
         let res =  await testUrl
             .get('/users')
             .set('Content-Type',  'application/json')
             .expect(200);
        // console.log(res.body);

        res.body.length.should.equals(10);
    })

    let userIDs = [1, 8];
    itParam('Verify GET User request by Id',userIDs, async (userId) => {
        let res = await testUrl
            .get(`/users/${userId}`)
            .set('Content-Type', 'application/json')
            .expect(200);
        // console.log(res.body);

        if (userId == 8) {
            res.body.name.should.equals('Nicholas Runolfsdottir V');
        }
    })

    const newUser = {
        name: 'Test User',
        username: 'test.user',
        email: "testuser@gmail.com",
        address: {
        },
        phone: "012 2222 3456",
        website: "testUser.org",
        company: {
            name: "testName",
            catchPhrase: "testCP",
            bs: "testBs"
        }
    };

    it('Verify POST Users request',    async () => {
         let res =  await testUrl
             .post('/users')
             .send (newUser)
             .set('Content-Type',  'application/json')
             .expect(201)
        // console.log(res.body);

         res.body.should.containDeep(newUser);
    })
});