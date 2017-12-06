/* jslint node: true, sub: true */
/* global describe: false, it: false */
'use strict';

var kbalance = require('../'),
    expect  = require('chai').expect;

// Tests

describe('kaztransgaz-balance', function() {

  // find
  describe('get()', function() {
    it('should get a balance with given account ID', function(done) {
      kbalance.get({id: '553105-658'}, function(err, result) {
        if(err) return done(err);

        expect(err).to.be.equal(null);

        expect(result).to.be.a('object');
        // expect(result).to.have.property('length').to.be.equal(1);
        // expect(result[0]).to.be.a('object');

        expect(result).to.have.property('balance').to.be.a('object');
        expect(result).to.have.property('balance').to.have.property('id', '553105-658');
        expect(result).to.have.property('balance').to.have.property('name').to.be.a('string');
        expect(result).to.have.property('balance').to.have.property('address').to.be.a('string');
        expect(result).to.have.property('balance').to.have.property('balance').to.be.a('string');
        expect(result).to.have.property('balance').to.have.property('payable_amount').to.be.a('string');
        expect(result).to.have.property('balance').to.have.property('currency', 'GEL');

        done();
      });
    });

    it('should fail to get a balance (missing options)', function(done) {
      kbalance.get(null, function(err, result) {
        if(!err) return done('No error!');

        expect(result).to.be.equal(undefined);
        done();
      });
    });

    it('should not return any balance (bad account ID)', function(done) {
      kbalance.get({id: '.'}, function(err, result) {
        if(err) return done(err);

        expect(err).to.be.equal(null);
        expect(result).to.be.a('object');
        done();
      });
    });
  });

});