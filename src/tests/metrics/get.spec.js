const request = require('supertest');
const expect = require('chai').expect;
const app = require('../../../app');
const testHelpers = require('../testhelpers');
const db = require("../../db.js");
const EdigaUser = db.EdigaUser;
const User = db.User;
const UserRegisterInfo = db.UserRegisterInfo;

const url = '/api/metrics';
const id1 = '00000000-0000-0000-0000-00000000000';
const id2 = '00000000-0000-0000-0000-0000000000';
const adminId = '00000000-0000-0000-0000-000000000010';

describe('Testing get metrics', function () {
    beforeEach(async () => {
        await EdigaUser.create({
            edigaUserId: adminId,
            email: 'salberti@mailinator.com',
            name: 'admin',
            password: '$2a$10$vckIktUKxSSkLdwsYmze4.nx20M1/E67RF0ydh5cKI/TaT8LeRMl2',
            firstLogin: false,
            isAdmin: true,
            country: 'UY',
        });
        for (let index = 1; index <= 23; index++) {
            const newUser = await User.create({
                userId: index < 10 ? `${id1}${index}` : `${id2}${index}`,
                country: index <= 10 ? 'MX' : index <= 18 ? 'ES' : 'UY', // UY, ES, MX
            });
            await UserRegisterInfo.create({
                userId: newUser.userId,
                answer1: Math.round(index / 4), // 1 y 6
                answer2: index <= 5 ? 13 :
                    index <= 8 ? 14 :
                        index <= 12 ? 15 :
                            index <= 15 ? 16 : 17, // 13 y 17
                answer1Field: null,
                answer3: index / 2 ? 'Si' : 'No',
                answer3Field: index / 2 ? `user${index}` : null,
                alias: `alias${index}`
            });
        }
    });
    afterEach(async () => {
        for (let index = 1; index <= 23; index++) {
            await UserRegisterInfo.destroy({
                where: { userId: index < 10 ? `${id1}${index}` : `${id2}${index}` },
                force: true,
            });
            await User.destroy({
                where: { userId: index < 10 ? `${id1}${index}` : `${id2}${index}` },
                force: true,
            });
        }
        await EdigaUser.destroy({ where: { edigaUserId: adminId } });
    });
    it('should return metrics', async function () {
        const loginAns = await request(app)
            .post(`/api/login`)
            .send({ email: "salberti@mailinator.com", password: "1234567" });
        const textLogin = JSON.parse(loginAns.text);
        const token = textLogin.token;

        const response = await request(app)
            .get(`${url}`)
            .set('Authorization', `Bearer ${token}`);
        const metrics = JSON.parse(response.text);
        testHelpers.checkStatusCode(response, 200);
        expect(metrics.countries.length).to.be.equal(3);
        expect(metrics.totalUsers).to.be.equal(23);
        expect(metrics.userAges.length).to.be.equal(5);
    });
})