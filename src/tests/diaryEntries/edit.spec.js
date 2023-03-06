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

  describe('/PUT diaryEntry', () => {
      it('Should edit a diaryEntry', async function () {
        const loginans = await request(server)
            .post(`/api/login`)
            .send({ email: "salberti@mailinator.com", password: "1234567" });
        const textLogin = JSON.parse(loginans.text);
        const token = textLogin.token;
          let diaryEntry = {
                entryId: "34df8e2e-aba6-4197-be9b-7804e7c5cbe9",
                entry: "<p>This is an edited test</p>"
          }
            chai.request(server)
            .put(`${url}`).set('Authorization', `Bearer ${token}`)
            .send(diaryEntry)
            .end((err, res) => {
                  res.should.have.status(200);
                  expect((JSON.parse(res.text)).message).to.be.equal('Entrada de campo editada exitosamente');
            });
      });
  });
