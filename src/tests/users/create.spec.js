process.env.NODE_ENV = 'test';
const request = require('supertest');
const expect = require('chai').expect;
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../app');
const testHelpers = require('../testHelpers');
const db = require("../../db.js");
const User = db.User;
const EdigaUser = db.EdigaUser;
const UserRegisterInfo = db.UserRegisterInfo;
const url = '/api/createUser';
let should = chai.should();

const id = '00000000-0000-0000-0000-000000000008';

chai.use(chaiHttp);

  describe('/POST user', () => {
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
    });
    afterEach(async () => {
      await UserRegisterInfo.destroy({ where: { alias : "Testing"}, force: true });
      await EdigaUser.destroy({ where: { edigaUserId : `${id}`} });
    })
      it('Should post a user', async function () {
        const loginans = await request(server)
            .post(`/api/login`)
            .send({ email: "mail@mailinator.com", password: "1234567" });
        const textLogin = JSON.parse(loginans.text);
        const token = textLogin.token;
          let user = {
            userCountry: "UY",
            answer1: 2,
            answer2: 15,
            answer1openField: "Hombres",
            answer3: "No",
            answer3openField: null,
            alias: "Testing"
         }
          const ans = await request(server)
            .post(`${url}`).set('Authorization', `Bearer ${token}`)
            .send(user);
            ans.should.have.status(200);
            expect((JSON.parse(ans.text)).message).to.be.equal('Sujeto creado exitosamente');
      });
  });
