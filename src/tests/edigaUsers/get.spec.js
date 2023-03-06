const request = require('supertest');
const expect = require('chai').expect;
const app = require('../../../app');
const testHelpers = require('../testhelpers');
const db = require("../../db.js");
const EdigaUser = db.EdigaUser;

const url = '/api/edigaUsers/';
const id = '00000000-0000-0000-0000-000000000000';

describe('Testing get ediga user', function () {
	beforeEach(async () => {
		const edigaUser = await EdigaUser.create({
			edigaUserId: id,
			email: 'mail@mailinator.com',
			name: 'test name',
			password: 'password hash',
			firstLogin: false,
			isAdmin: false,
			country: 'UY',
		});
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
		// expect(body).to.haveOwnProperty('count');
		// expect(body.count).to.be.equal(1);
		// expect(body.data.length).to.be.equal(1);
	});
})