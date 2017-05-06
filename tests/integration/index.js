import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const should = chai.should();

import { app } from '../../backend/app';
import Connection from '../../backend/models/Connection';

const CORRECT_CREDENTIALS = {
  email: 'asdf@asdf.com',
  password: '***REMOVED***'
};
const CORRECT_TOKEN = '***REMOVED***';

let con;

describe('[IT] Integration test ', () => {

  before((done) => { // run before all of the tests
    con = new Connection('test');
    con.init((err) => {
      if (err) { done(err); }
      con.dropAllTables(() => {
        con.createAllTables((err) => {
          done(err);
        });
      });
    });
  });

  beforeEach((done) => { // run before each test
    con.clearAllTables(() => {
      con.populateAllTables((err) => {
        done(err);
      });
    });
  });

  it('should load API and send information', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.statusCode.should.equal(200);
        should.exist(res.body.message);
        should.exist(res.body.latestVersion);
        done();
      });
  });

  it('should deny unauthenticated user to location data', (done) => {
    chai.request(app)
      .get('/1/locations')
      .end((err, res) => {
        res.statusCode.should.equal(401);
        done();
      });
  });

  it('should allow unauthenticated user to the api path', (done) => {
    chai.request(app)
      .get('/1/')
      .end((err, res) => {
        res.statusCode.should.equal(200);
        done();
      });
  });

  it('should authenticate user correctly', (done) => {
    const { email, password } = CORRECT_CREDENTIALS;
    chai.request(app)
      .post('/1/auth/')
      .send(CORRECT_CREDENTIALS)
      .end((err, res) => {
        res.body.token.should.exist;
        res.statusCode.should.equal(200);
        done();
      });
  });

  it('should NOT authenticate invalid user', (done) => {
    const { email, password } = CORRECT_CREDENTIALS;
    chai.request(app)
      .post('/1/auth/')
      .send({
        email: 'asdf',
        password: 'qwer'
      })
      .end((err, res) => {
        res.statusCode.should.equal(401);
        done();
      });
  });

  it('should return ok for CORRECT token', (done) => {
    chai.request(app)
      .get('/1/auth/check')
      .set('Authorization', CORRECT_TOKEN)
      .end((err, res) => {
        res.statusCode.should.equal(200);
        done();
      });
  });

  it('should return unauthorized for INCORRECT token', (done) => {
    chai.request(app)
      .get('/1/auth/check')
      .set('Authorization', 'hacking')
      .end((err, res) => {
        res.statusCode.should.equal(401);
        done();
      });
  });

  it('should return locations with correct token', (done) => {
    chai.request(app)
      .get('/1/locations')
      .set('Authorization', CORRECT_TOKEN)
      .end((err, res) => {
        res.statusCode.should.equal(200);
        done();
      });
  });

  it('should deny unauthenticated user to units', (done) => {
    chai.request(app)
      .get('/1/units')
      .set('Authorization', 'hacking')
      .end((err, res) => {
        res.statusCode.should.equal(401);
        done();
      });
  });

  it('should return units to authenticated user', (done) => {
    chai.request(app)
      .get('/1/units')
      .set('Authorization', CORRECT_TOKEN)
      .end((err, res) => {
        res.statusCode.should.equal(200);
        done();
      });
  });

});

