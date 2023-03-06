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

describe('Should get a diaryEntry', () => {
  describe('/GET diaryEntry', () => {
      it('it should GET the diaryEntries', (done) => {
            chai.request(server)
            .get('/api/diaryEntry/d0838052-0da0-495a-9ae4-99d5ea21e511')
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });
  });
});