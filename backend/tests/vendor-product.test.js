// During the rest the en variable is set to test
/* global describe it beforeEach */
process.env.NODE_ENV = 'test';

var vendorProduct = require('../models/vendorProduct.model');

// Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
var chaiHttp = require('chai-http');

// You need to import your server
var server = require('../server');

var should = chai.should();
// Set up the chai Http assertion library
chai.use(chaiHttp);

// Your tests
describe('VendorProduct', () => {
    beforeEach((done) => {
        vendorProduct.remove({}, (err) => {
            done();
        });
    });
    
    /**
     * Test the GET /api/vendor-product
     */
    describe('GET /api/v1/vendor-product', () => {
        it('it should GET all the vendor products', (done) => {
            chai.request(server)
                .get('/api/v1/vendor-product')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });
    // More test...
});