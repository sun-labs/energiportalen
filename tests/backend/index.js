import chai from 'chai';
import mysql from 'mysql';
import TestDB from './TestDB';
const should = chai.should();

describe('[BE] Placeholder tests', () => {

  before((done) => { // run before all of the tests
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

  it('Checks if tests work', (done) => {
    false.should.equal.false;
    done();
  });

});