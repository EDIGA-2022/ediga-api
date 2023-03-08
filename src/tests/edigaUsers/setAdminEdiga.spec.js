const request = require('supertest');
const expect = require('chai').expect;
const app = require('../../../app');
const testHelpers = require('../testhelpers');
const db = require("../../db.js");
const EdigaUser = db.EdigaUser;

const url = '/api/setAdminEdiga';
const id = '00000000-0000-0000-0000-000000000000';
const adminId = '00000000-0000-0000-0000-000000000010';

describe('Testing set admin ediga user', function () {
    beforeEach(async () => {
        await EdigaUser.create({
            edigaUserId: '00000000-0000-0000-0000-000000000010',
            email: 'salberti@mailinator.com',
            name: 'admin',
            password: '$2a$10$vckIktUKxSSkLdwsYmze4.nx20M1/E67RF0ydh5cKI/TaT8LeRMl2',
            firstLogin: false,
            isAdmin: true,
            country: 'UY',
        });
        await EdigaUser.create({
            edigaUserId: id,
            email: 'mail@mailinator.com',
            name: 'test name',
            password: 'password hash',
            firstLogin: false,
            isAdmin: false,
            country: 'UY',
        });
    });
    afterEach(async () => {
        await EdigaUser.destroy({ where: { edigaUserId: id } });
        await EdigaUser.destroy({ where: { edigaUserId: adminId } });
    });
    it('should set true to isAdmin ediga user', async function () {
        const loginAns = await request(app)
            .post(`/api/login`)
            .send({ email: "salberti@mailinator.com", password: "1234567" });
        const textLogin = JSON.parse(loginAns.text);
        const token = textLogin.token;

        const response = await request(app)
            .post(`${url}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                admin: true,
                userId: id,
            });
        testHelpers.checkStatusCode(response, 200);
        const edigaUser = await EdigaUser.findByPk(id);
        expect(edigaUser.isAdmin).to.be.equal(true);
    });
})