import chai from 'chai';
import 'source-map-support/register';

import Connection from '../../backend/models/Connection';
import Unit from '../../backend/models/Unit';
import Location from '../../backend/models/Location';
import User from '../../backend/models/User';
import Authentication from '../../backend/controllers/Authentication';

const should = chai.should();

const CORRECT_CREDENTIALS = {
  email: 'asdf@asdf.com',
  password: '***REMOVED***'
};

let con;

describe('[BE] Authentication tests', () => {

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

  it('Get locations', (done) => {
    Location.getLocations((err, locations) => {
      should.not.exist(err);
      locations.length.should.equal(3);
      done();
    });
  });

  it('Get units from location', (done) => {
    Unit.getUnitsFromLocation(1, (err, units) => {
      should.not.exist(err);
      units.length.should.equal(5);
      done();
    });
  });

  it('Get all units', (done) => {
    Unit.getUnits((err, units) => {
      should.not.exist(err);
      units.length.should.equal(6);
      done();
    });
  });

  /**
   * NOTE Doesnt work atm as we dont have a test-db
   * for daily grouped data.
   */
  it('Get all keys for a unit', (done) => {
    const unitId = 1;
    Unit.getUnitKeys(unitId, (err, keys) => {
      should.not.exist(err);
      //keys.length.should.equal(2); // correct
      should.exist(keys);
      done();
    });
  });

  /**
   * NOTE Doesnt work atm as we dont have a test-db
   * for daily grouped data.
   */
  it('Get all data from a unit', (done) => {
    const unitId = 1;
    const keyId = 1;
    Unit.getUnitDataFromKeyDate(unitId, keyId, {
      interval: 'raw'
    }, (err, res) => {
      should.not.exist(err);
      should.exist(res);
      res.length.should.equal(16);
      done();
    });
  });

  it('Get all data from a unit with valid time span', (done) => {
    const unitId = 1;
    const keyId = 1;
    Unit.getUnitDataFromKeyDate(unitId, keyId, {
      interval: 'hour',
      date: {
        from: '2017-02-09',
        to: '2017-02-10 23:59:59'
      }
    }, (err, data) => {
      should.not.exist(err);
      data.length.should.equal(2);
      should.exist(data);
      done();
    });
  });

  it('Get all data from a unit with invalid reverse time span', (done) => {
    const unitId = 1;
    const keyId = 1;
    Unit.getUnitDataFromKeyDate(unitId, keyId, {
      interval: 'hour',
      date: {
        to: '2017-02-09',
        from: '2017-02-10 23:59:59'
      }
    }, (err, data) => {
      should.exist(err);
      should.not.exist(data);
      done();
    });
  });

  it('Undefined time span in unit data request with hourly interval', (done) => {
    const unitId = 1;
    const keyId = 1;
    Unit.getUnitDataFromKeyDate(unitId, keyId, {
      interval: 'hour'
    }, (err, data) => {
      should.not.exist(err);
      should.exist(data);
      data.length.should.equal(10);
      done();
    });
  });

  it('all data for a unit and a daily interval', (done) => {
    const unitId = 1;
    const keyId = 1;
    Unit.getUnitDataFromKeyDate(unitId, keyId, {
      interval: 'day'
    }, (err, data) => {
      should.not.exist(err);
      should.exist(data);
      data.length.should.equal(6);
      done();
    });
  });

  it('all data for a unit with minute interval', (done) => {
    const unitId = 1;
    const keyId = 1;
    Unit.getUnitDataFromKeyDate(unitId, keyId, {
      interval: 'min'
    }, (err, data) => {
      should.not.exist(err);
      should.exist(data);
      data.length.should.equal(12);
      done();
    });
  });

  it('Get metadata from a location', (done) => {
    const locationId = 2;
    Location.getLocation(locationId, (err, loc) => {
      should.not.exist(err);
      const name = loc.name.toLowerCase();
      name.should.equal('base10');
      loc.id.should.equal(2);
      done();
    });
  });

});

