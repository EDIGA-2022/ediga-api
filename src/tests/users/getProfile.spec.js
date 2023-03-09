const request = require('supertest');
const expect = require('chai').expect;
const app = require('../../../app');
const testHelpers = require('../testhelpers');
const db = require("../../db.js");
const EdigaUser = db.EdigaUser;
const User = db.User;
const UserRegisterInfo = db.UserRegisterInfo;
const Photo = db.Photo;

const url = '/api/user/profile/';
const id = '00000000-0000-0000-0000-000000000000';
const adminId = '00000000-0000-0000-0000-000000000010';

describe('Testing get user profile', function () {
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
        const newUser = await User.create({
            userId: id,
            country: 'UY',
        });
        await UserRegisterInfo.create({
            userId: id,
            answer1: 5, // 1 y 6
            answer2: 17, // 13 y 17
            answer1Field: null,
            answer3: 'Si',
            answer3Field: 'igAccount',
            alias: 'alias',
        });
        await Photo.create({
            userId: id,
            answer1: 1, // 1 y 6
            answer2: 2, // 13 y 17
            answer3: 3,
            photo: 'photoBase64',
            createdAt: '2023-02-25 11:14:39.000000',
        });
    });
    afterEach(async () => {
        await Photo.destroy({ where: { userId: id }, force: true });
        await EdigaUser.destroy({ where: { edigaUserId: adminId } });
        await User.destroy({ where: { userId: id }, force: true });
    });
    it('should return user profile data', async function () {
        const loginAns = await request(app)
            .post(`/api/login`)
            .send({ email: "salberti@mailinator.com", password: "1234567" });
        const textLogin = JSON.parse(loginAns.text);
        const token = textLogin.token;

        const response = await request(app)
            .get(`${url}${id}`)
            .set('Authorization', `Bearer ${token}`);
        testHelpers.checkStatusCode(response, 200);
        const userProfile = JSON.parse(response.text);
        expect(userProfile.yearsOld).to.be.equal(17);
        expect(userProfile.genre).to.be.equal('No binario');
        expect(userProfile.photos.length).to.be.equal(1);
        expect(userProfile.country).to.be.equal('UY');
        expect(userProfile.investigated).to.be.equal(true);
        expect(userProfile.alias).to.be.equal('alias');
    });
})