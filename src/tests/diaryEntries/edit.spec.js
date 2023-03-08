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

const id = '00000000-0000-0000-0000-000000000001';

chai.use(chaiHttp);

describe('/PUT diaryEntry', () => {
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
  it('Should edit a diaryEntry', async function () {
    const loginans = await request(server)
      .post(`/api/login`)
      .send({ email: "mail@mailinator.com", password: "1234567" });
    const textLogin = JSON.parse(loginans.text);
    const token = textLogin.token;
    let diaryEntry = {
      entryId: id,
      entry: "<p>This is an edited test</p>"
    }
    const ans = await request(server)
      .put(`${url}`).set('Authorization', `Bearer ${token}`)
      .send(diaryEntry);
    ans.should.have.status(200);
    expect((JSON.parse(ans.text)).message).to.be.equal('Entrada de campo editada exitosamente');
  });
});
