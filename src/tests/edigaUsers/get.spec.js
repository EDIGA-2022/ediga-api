const request = require('supertest');
const expect = require('chai').expect;
const app = require('../../../app');
const testHelpers = require('../testHelpers');
const db = require("../../db.js");
const EdigaUser = db.EdigaUser;

const url = '/api/edigaUsers/';
const id = '00000000-0000-0000-0000-000000000000';
const adminId = '00000000-0000-0000-0000-000000000010';

describe('Testing get ediga user', function () {
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
	it('should return ediga user', async function () {
		const loginAns = await request(app)
			.post(`/api/login`)
			.send({ email: "salberti@mailinator.com", password: "1234567" });
		const textLogin = JSON.parse(loginAns.text);
		const token = textLogin.token;

		const response = await request(app)
			.get(`${url}${id}`)
			.set('Authorization', `Bearer ${token}`);
		const user = JSON.parse(response.text).user;
		testHelpers.checkStatusCode(response, 200);
		expect(user.email).to.be.equal('mail@mailinator.com');
		expect(user.name).to.be.equal('test name');
		expect(user.isAdmin).to.be.equal(false);
		expect(user.country).to.be.equal('UY');
		expect(user.firstLogIn).to.be.equal(true);
	});
})