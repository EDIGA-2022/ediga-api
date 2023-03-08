const request = require('supertest');
const expect = require('chai').expect;
const app = require('../../../app');
const testHelpers = require('../testhelpers');
const db = require("../../db.js");
const EdigaUser = db.EdigaUser;

const url = '/api/edigaUsers';
const id = '00000000-0000-0000-0000-00000000000';
const adminId = '00000000-0000-0000-0000-000000000010';

describe('Testing get all ediga users', function () {
    beforeEach(async () => {
        await EdigaUser.create({
            edigaUserId: adminId,
            email: 'salberti@mailinator.com',
            name: `admin`,
            password: `$2a$10$vckIktUKxSSkLdwsYmze4.nx20M1/E67RF0ydh5cKI/TaT8LeRMl2`,
            firstLogin: false,
            isAdmin: true,
            country: 'UY',
        });
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
    afterEach(async () => {
        for (let index = 1; index < 10; index++) {
            await EdigaUser.destroy({ where: { edigaUserId: `${id}${index}` } });
        }
        await EdigaUser.destroy({ where: { edigaUserId: adminId } });
    });
    it('should return all 10 ediga users', async function () {
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
        for (let index = 0; index < 10; index++) {
            if (index === 0) {
                expect(users[index].email).to.be.equal('salberti@mailinator.com');
                expect(users[index].name).to.be.equal('admin');
                expect(users[index].isAdmin).to.be.equal(true);
                expect(users[index].country).to.be.equal('UY');
            } else {
                expect(users[index].email).to.be.equal(`mail${index}@mailinator.com`);
                expect(users[index].name).to.be.equal(`test name${index}`);
                expect(users[index].isAdmin).to.be.equal(false);
                expect(users[index].country).to.be.equal('UY');
            }
        }
        expect(users.length).to.be.equal(10);
    });
    it('should return unauthorized', async function () {
        let response = await request(app)
            .get(`${url}`);
        testHelpers.checkStatusCode(response, 401);
    });
})