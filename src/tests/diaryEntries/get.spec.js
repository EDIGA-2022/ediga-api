process.env.NODE_ENV = 'test';
const request = require('supertest');
const expect = require('chai').expect;
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../app');
const testHelpers = require('../testHelpers');
const db = require("../../db.js");
const DiaryEntry = db.DiaryEntry;
const EdigaUser = db.EdigaUser;
const User = db.User;
const url = '/api/diaryEntry';
let should = chai.should();

const id = '00000000-0000-0000-0000-000000000002';

chai.use(chaiHttp);

describe('/GET diaryEntry', () => {
  beforeEach(async () => {
    const edigaUser = await EdigaUser.create({
      edigaUserId: id,
      email: 'mail@mailinator.com',
      name: 'test name',
      password: '$2a$10$vckIktUKxSSkLdwsYmze4.nx20M1/E67RF0ydh5cKI/TaT8LeRMl2',
      firstLogin: false,
      isAdmin: false,
      country: 'UY'
    });
    const user = await User.create({
      userId: id,
      country: 'UY'
    });
    const diaryEntry = await DiaryEntry.create({
      diaryEntryId: id,
      userId: id,
      text: "<p>This is a test</p>",
      createdBy: id
    });
  });
  afterEach(async () => {
    await DiaryEntry.destroy({ where: { diaryEntryId: `${id}` }, force: true });
    await EdigaUser.destroy({ where: { edigaUserId: `${id}` } });
    await User.destroy({ where: { userId: `${id}` }, force: true });
  })
  it('Should get a diaryEntry', async function () {
    const loginans = await request(server)
      .post(`/api/login`)
      .send({ email: "mail@mailinator.com", password: "1234567" });
    const textLogin = JSON.parse(loginans.text);
    const token = textLogin.token;
    const ans = await request(server)
      .get(`${url}/${id}`).set('Authorization', `Bearer ${token}`);
    ans.should.have.status(200);
    const diaryEntry = JSON.parse(ans.text);
    expect(diaryEntry.userId).to.be.equal(id);
    expect(diaryEntry.entry).to.be.equal("<p>This is a test</p>");
  });
});