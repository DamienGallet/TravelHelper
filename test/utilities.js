'use strict'

// Test dependancies
var chai = require('chai');
var should = require('chai').should();
var assert = require('assert');

// Test target
var utilities = require('../app/utilities');

describe('getInterval', function() {
  it( 'should compute the number of days in nominal case',
      (done) => {
        var beg = "2014-07-01T00:00:00.000-07:00"
        var end = "2014-07-02T00:00:00.000-07:00"

        var difference = utilities.getInterval(beg, end);
        difference.should.equal(1);
        done();
      }
    );

  it( 'should throw an exception if the difference is negative',
      (done) => {
        var beg = "2014-07-02T00:00:00.000-07:00"
        var end = "2014-07-01T00:00:00.000-07:00"

        assert.throws(() => utilities.getInterval(beg,end),
                      RangeError,
                      utilities.errorCode.getInterval.negativeInterval);
        done();
      }
    );
});
