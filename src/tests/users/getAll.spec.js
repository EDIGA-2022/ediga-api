const request = require('supertest');
const expect = require('chai').expect;
const app = require('../../../app');
const testHelpers = require('../testhelpers');
const db = require("../../db.js");
const EdigaUser = db.EdigaUser;
const User = db.User;
const UserRegisterInfo = db.UserRegisterInfo;

const url = '/api/users';
const id = '00000000-0000-0000-0000-00000000000';
const adminId = '00000000-0000-0000-0000-000000000010';

describe('Testing get all users', function () {
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
        for (let index = 1; index < 10; index++) {
            const newUser = await User.create({
                userId: `${id}${index}`,
                country: index <= 5 ? 'MX' : index <= 7 ? 'ES' : 'UY', // UY, ES, MX
            });
            await UserRegisterInfo.create({
                userId: newUser.userId,
                answer1: Math.round(index / 2), // 1 y 6
                answer2: index <= 3 ? 13 :
                    index <= 5 ? 14 :
                        index <= 7 ? 15 :
                            index <= 8 ? 16 : 17, // 13 y 17
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
                where: { userId: `${id}${index}` },
                force: true,
            });
            await User.destroy({
                where: { userId: `${id}${index}` },
                force: true,
            });
        }
        await EdigaUser.destroy({ where: { edigaUserId: adminId } });
    });
    it('should return all 9 users', async function () {
        const loginAns = await request(app)
            .post(`/api/login`)
            .send({ email: "salberti@mailinator.com", password: "1234567" });
        const textLogin = JSON.parse(loginAns.text);
        const token = textLogin.token;

        const response = await request(app)
            .get(`${url}`)
            .set('Authorization', `Bearer ${token}`);
        const users = JSON.parse(response.text);
        testHelpers.checkStatusCode(response, 200);
        for (let index = 1; index < 10; index++) {
            const user = users[index-1];
            expect(user.country).to.be.equal(index <= 5 ? 'Mexico' : index <= 7 ? 'España' : 'Uruguay');
            expect(user.yearsOld).to.be.equal(index <= 3 ? 13 :
                index <= 5 ? 14 :
                    index <= 7 ? 15 :
                        index <= 8 ? 16 : 17);
            expect(user.alias).to.be.equal(`alias${index}`);
        }
    });
})