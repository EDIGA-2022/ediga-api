process.env.NODE_ENV = 'test';
const request = require('supertest');
const expect = require('chai').expect;
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../app');
const testHelpers = require('../testHelpers');
const db = require("../../db.js");
const DiaryEntry = db.DiaryEntry;
const url = '/api/diaryEntry';
let should = chai.should();

chai.use(chaiHttp);

  describe('/GET diaryEntry', () => {
      it('Should get a diaryEntry', async function () {
        const loginans = await request(server)
            .post(`/api/login`)
            .send({ email: "salberti@mailinator.com", password: "1234567" });
        const textLogin = JSON.parse(loginans.text);
        const token = textLogin.token;
            chai.request(server)
            .get(`${url}/34df8e2e-aba6-4197-be9b-7804e7c5cbe9`).set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                  res.should.have.status(200);
            });
      });
  });