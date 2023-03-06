process.env.NODE_ENV = 'test';
const request = require('supertest');
const expect = require('chai').expect;
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../app');
const testHelpers = require('../testHelpers');
const db = require("../../db.js");
const DiaryEntry = db.DiaryEntry;
const url = '/api/diaryEntry/';
let should = chai.should();

chai.use(chaiHttp);

describe('Should create a diaryEntry', () => {
  describe('/POST diaryEntry', () => {
      it('Should post a diaryEntry', (done) => {
          let diaryEntry = {
              userId: "039189ac-c41e-4b82-ae00-9f2062a94bcb",
              entry: "<p>This is a test</p>"
          }
            chai.request(server)
            .post('/api/diaryEntry')
            .send(diaryEntry)
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });
  });
});
