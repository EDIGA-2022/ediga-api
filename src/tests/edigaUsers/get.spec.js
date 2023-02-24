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
          })
	});
	it('should return ediga user', async function () {
		let response = await request(app)
			.get(`${url}${id}`)
		console.log("response", JSON.stringify(response));
		testHelpers.checkStatusCode(response, 200);
		expect(response.user.email).to.be.equal('mail@mailinator.com');
		expect(response.user.name).to.be.equal('test name');
		expect(response.user.password).to.be.equal('password hash');
		expect(response.user.isAdmin).to.be.equal(false);
		expect(response.user.country).to.be.equal('UY');
		// expect(response.body).to.haveOwnProperty('count');
		// expect(response.body.count).to.be.equal(1);
		// expect(response.body.data.length).to.be.equal(1);
	});
})