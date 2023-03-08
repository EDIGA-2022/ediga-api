process.env.NODE_ENV = 'test';
const request = require('supertest');
const expect = require('chai').expect;
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../app');
const testHelpers = require('../testHelpers');
const db = require("../../db.js");
const Observation = db.Observation;
const EdigaUser = db.EdigaUser;
const User = db.User;
const url = '/api/observation';
let should = chai.should();

const id = '00000000-0000-0000-0000-000000000006';

chai.use(chaiHttp);

  describe('/PUT observation', () => {
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
      const observation = await Observation.create({
        observationId: id,
        userId: id,
        text: "<p>This is a test</p>",
        createdBy: id,
        createdAt: "2022-10-16 00:00:00.0",
        updatedAt: "2022-10-16 00:00:00.0",
        title: "this is a test",
        type: "R",
        likes: 32,
        comments: 23,
        music: "This is a music test",
        hasMusic: true,
        publicationDate: "2022-10-16 00:00:00.0",
      });
    });
    afterEach(async () => {
      await Observation.destroy({ where: { observationId : `${id}`}, force: true });
      await EdigaUser.destroy({ where: { edigaUserId : `${id}`} });
      await User.destroy({ where: { userId : `${id}`} , force: true });
    })
      it('Should edit an observation', async function () {
        const loginans = await request(server)
            .post(`/api/login`)
            .send({ email: "mail@mailinator.com", password: "1234567" });
        const textLogin = JSON.parse(loginans.text);
        const token = textLogin.token;
        const newObservation = {
            observationId: id,
            userId: id,
            title: "this is an edited test",
            type: "R",
            likes: 24,
            comments: 45,
            music: "This is a music edit test",
            publicationDate: "2022-10-16 00:00:00.0",
            hasMusic: true,
            text: "<p>This is an edit test</p>",
            updatedAt: "2022-10-16 00:00:00.0"
        };
        const ans = await request(server)
            .put(`${url}`).set('Authorization', `Bearer ${token}`)
            .send(newObservation);
            testHelpers.checkStatusCode(ans, 200);
            expect((JSON.parse(ans.text)).message).to.be.equal('Observación editada exitosamente');
      });
  });
