const request = require('supertest');
const expect = require('chai').expect;
const app = require('../../../app');
const testHelpers = require('../testhelpers');
const db = require("../../db.js");
const EdigaUser = db.EdigaUser;

const url = '/api/edigaUsers';
const id = '00000000-0000-0000-0000-00000000000';

describe('Testing get ediga user', function () {
    beforeEach(async () => {
        for (let index = 1; index < 10; index++) {
            await EdigaUser.create({
                edigaUserId: `${id}${index}`,
                email: `mail${index}@mailinator.com`,
                name: `test name${index}`,
                password: `password hash${index}`,
                firstLogin: false,
                isAdmin: false,
                country: 'UY',
            });
        }
    });
    it('should return all 9 ediga users', async function () {
        const loginAns = await request(app)
            .post(`/api/login`)
            .send({ email: "salberti@mailinator.com", password: "1234567" });
        const textLogin = JSON.parse(loginAns.text);
        const token = textLogin.token;

        let response = await request(app)
            .get(`${url}`)
            .set('Authorization', `Bearer ${token}`);
        testHelpers.checkStatusCode(response, 200);
        const users = JSON.parse(response.text).users;
            // expect(response.user.email).to.be.equal('mail@mailinator.com');
            // expect(response.user.name).to.be.equal('test name');
            // expect(response.user.password).to.be.equal('password hash');
            // expect(response.user.isAdmin).to.be.equal
            // (false);
        // expect(response.user.country).to.be.equal('UY');
        // expect(response.body).to.haveOwnProperty('count');
        // expect(response.body.count).to.be.equal(1);
        // expect(response.body.data.length).to.be.equal(1);
    });
    it('should return unauthorized', async function () {
        let response = await request(app)
            .get(`${url}`);
        testHelpers.checkStatusCode(response, 401);
        // const users = JSON.parse(response.text).users;
        // console.log("users", users)
        // expect(response.user.email).to.be.equal('mail@mailinator.com');
        // expect(response.user.name).to.be.equal('test name');
        // expect(response.user.password).to.be.equal('password hash');
        // expect(response.user.isAdmin).to.be.equal(false);
        // expect(response.user.country).to.be.equal('UY');
        // expect(response.body).to.haveOwnProperty('count');
        // expect(response.body.count).to.be.equal(1);
        // expect(response.body.data.length).to.be.equal(1);
    });
})