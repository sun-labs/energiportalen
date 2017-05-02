import chai from 'chai';
import mysql from 'mysql';
import TestDB from './TestDB';
import Authentication from '../../backend/controllers/Authentication.js';
import User from '../../backend/models/User.js';
import 'source-map-support/register';

const should = chai.should();

const CORRECT_CREDENTIALS = {
  email: 'asdf@asdf.com',
  password: '***REMOVED***'
};

describe('[BE] Authentication tests', () => {

  before((done) => { // run before all of the tests
    TestDB.connect((err) => {
      should.not.exist(err);
      TestDB.clearTables(() => {
        TestDB.createUnits(() => {
          TestDB.createUnitKeys(() => {
            TestDB.createUnitData(() => {
              TestDB.createUsers(() => {
                done();
              });
            });
          });
        });
      });
    });
  });

  beforeEach((done) => { // run before each test
    TestDB.clearTableData(() => {
      TestDB.populateUnits(() => {
        TestDB.populateUnitKeys(() => {
          TestDB.populateUnitData(() => {
            TestDB.populateUsers(() => {
              done();
            });
          });
        })
      });
    });
  });

  it('Check CORRECT Sign In.', (done) => {
    Authentication.verifyCredentials(CORRECT_CREDENTIALS, (err, user) => {
      should.exist(user);
      user.email.should.equal(CORRECT_CREDENTIALS.email);
      should.not.exist(err);
      done();
    });
  });

  it('Check empty credentials sign in.', (done) => {
    Authentication.verifyCredentials({ email: '', password: '' }, (err, user) => {
      should.not.exist(user);
      should.exist(err);
      done();
    });
  });

  it('Check undefined credentials sign in.', (done) => {
    Authentication.verifyCredentials({}, (err, user) => {
      should.not.exist(user);
      should.exist(err);
      done();
    });
  });

  it('Correct email getting User from DB', (done) => {
    User.getUser(CORRECT_CREDENTIALS, (err, user) => {
      user.email.should.equal(CORRECT_CREDENTIALS.email);
      should.not.exist(err);
      done();
    });
  });

  it('Incorrect email getting User from DB', (done) => {
    User.getUser({ email: 'lirrekarrevirre@sunlabs.se' }, (err, user) => {
      should.not.exist(user);
      should.not.exist(err);
      done();
    });
  });

  it('User count database.', (done) => {
      User.getUserCount((count) => {
        count.should.equal(1);
        done();
      });
  });

  it('Add user correct mail and password.', (done) => {
      User.storeUser({ 
        email: 'hello@sunlabs.se', 
        password: 'lala' 
      }, (err, result) => {
        should.not.exist(err);
        should.exist(result);
        User.getUserCount((count) => {
          count.should.equal(2);
          done();
        });
      });
  });

  it('Add user duplicate mail and password.', (done) => {
      User.storeUser(CORRECT_CREDENTIALS, 
      (err, result) => {
        should.exist(err);
        should.not.exist(result);
        done();
      });
  });

  it('Add user empty mail and password.', (done) => {
      User.storeUser({
        email: '',
        password: ''
      }, (err, results) => {
        should.exist(err);
        should.not.exist(results);
        done();
      });
  });

  it('Edge cases with emails and spam inputs', () => {
    User.validEmail('asdfasdf.asdf').should.not.be.true;
    User.validEmail('asdf@asdf.asdf').should.be.true;
    User.validEmail('asdf@asdfasdf').should.be.false;
    User.validEmail('victor.linus@gmail.com').should.be.true;
    User.validEmail('victor@linus@gmail.com').should.not.be.true;
  });
  
  it('Duplicate SignUp', (done) => {
    Authentication.signUp(CORRECT_CREDENTIALS, (err, user) => {
      should.exist(err);
      should.not.exist(user);
      done();
    });
  });

  it('Undefined SignUp', (done) => {
    Authentication.signUp({}, (err, user) => {
      should.exist(err);
      should.not.exist(user);
      done();
    });
  });

  it('Empty SignUp', (done) => {
    Authentication.signUp({ email: '', password: '' }, (err, user) => {
      should.exist(err);
      should.not.exist(user);
      done();
    });
  });

   it('Correct SignUp', (done) => {
     const newUser = {
      email: 'fb@se.se',
      password: 'popo'
     };
    Authentication.signUp(newUser, (err, user) => {
      should.not.exist(err);
      should.exist(user);
      newUser.email.should.equal(user.email);
      done();
    });
  });

});

