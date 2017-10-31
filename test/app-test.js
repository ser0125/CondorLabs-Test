//For the test i used Mocha that is test framework
//Supertest is a library that made the HTTP assertions easier
var supertest = require('supertest'),
    chai = require('chai'),
    should = require('should'),
    assert = require('assert'),
    app = require('.././server.js');


var request = supertest(app);
var expect = chai.expect;

//This are the test for the list of providers 
describe('GET /list', function () {
    this.timeout(8000);
    //We verify that the url returns us 200 that is ok
    it('should return code 200', function (done) {
        request.get('/list')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done(err);
            });
    });
    //We verify that the url return us a json 
    it('should return a Content-Type application/json', function (done) {
        request.get('/list')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                done(err);
            });
    });
    //We verify that the url return us a json Object
    it('should return a correct Json Object', function (done) {
        request.get('/list')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                should.not.exist(err);
                should.exist(res);
                res.body.should.be.an.Object;
                done();
            });
    });
});

//This are the test for one provider of the list 
describe('GET /list:firstname', function () {
    this.timeout(8000);
    it('should return code 200', function (done) {
        request.get('/list/Demarcus')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done(err);
            });
    });
    it('should return a Content-Type application/json', function (done) {
        request.get('/list/Demarcus')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                done(err);
            });
    });

    it('should return a correct Json Object', function (done) {
        request.get('/list/Demarcus')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                should.not.exist(err);
                should.exist(res);
                res.body.should.be.an.Object;
                done();
            });
    });
    //We verify that the url return us the user that we search for
    it('should return the correct user', function (done) {
        request.get('/list/Demarcus')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                should.not.exist(err);
                should.exist(res);
                res.body.should.be.an.Object;
                assert.equal('Demarcus', res.body[0].firstName);
                done();
            });
    });
});

//This are the test to save a provider
//Take care, if you save something here is going to be in the database
describe('POST /saveInfo', function () {
    this.timeout(8000);
    it('should return code 200', function (done) {
        request.post('/saveInfo')
            .send({
                "firstName": "Sergio"
            })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done(err);
            });
    });

    it('should return a Content-Type text/html', function (done) {
        request.post('/saveInfo')
            .send({
                "firstName": "Sergio"
            })
            .expect(200)
            .expect('Content-Type', 'text/html; charset=utf-8')
            .end(function (err, res) {
                if (err) return done(err);
                done(err);
            });
    });
});

//This are the test to update a provider that match with the parameter
//Take care, if you update something here is going to change in the database
describe('PUT /updateInfo:firstName', function () {
    this.timeout(8000);
    it('should return code 200', function (done) {
        request.put('/updateInfo/Sergio')
            .send({
                "firstName": "Jorge"
            })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done(err);
            });
    });
    it('should return a Content-Type text/html', function (done) {
        request.put('/updateInfo/Sergio')
            .send({
                "firstName": "Jorge"
            })
            .expect(200)
            .expect('Content-Type', 'text/html; charset=utf-8')
            .end(function (err, res) {
                if (err) return done(err);
                done(err);
            });
    });
});

//This are the test to update all the providers that match with the parameter
//Take care, if you update something here is change to be in the database
describe('PUT /updateAllInfo:firstName', function () {
    this.timeout(8000);
    it('should return code 200', function (done) {
        request.put('/updateAllInfo/Sergio')
            .send({
                "firstName": "Jorge"
            })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done(err);
            });
    });
    it('should return a Content-Type text/html', function (done) {
        request.put('/updateAllInfo/Jorge')
            .send({
                "firstName": "Sergio"
            })
            .expect(200)
            .expect('Content-Type', 'text/html; charset=utf-8')
            .end(function (err, res) {
                if (err) return done(err);
                done(err);
            });
    });
});

//This are the test to delete one provider that match with the parameter
//Take care, if you delete something here is going to delete this provider in the database
describe('DELETE /deleteInfo:firstName', function () {
    this.timeout(8000);
    it('should return code 200', function (done) {
        request.delete('/deleteInfo/Sergio')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done(err);
            });
    });
    it('should return a Content-Type text/html', function (done) {
        request.delete('/deleteInfo/Sergio')
            .expect(200)
            .expect('Content-Type', 'text/html; charset=utf-8')
            .end(function (err, res) {
                if (err) return done(err);
                done(err);
            });
    });
});
//This are the test to delete all provider that match with the parameter
//Take care, if you delete something here is going to delete the providers in the database
describe('DELETE /deleteAllInfo:firstName', function () {
    this.timeout(8000);
    it('should return code 200', function (done) {
        request.delete('/deleteAllInfo/Jorge')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done(err);
            });
    });
    it('should return a Content-Type text/html', function (done) {
        request.delete('/deleteAllInfo/Jorge')
            .expect(200)
            .expect('Content-Type', 'text/html; charset=utf-8')
            .end(function (err, res) {
                if (err) return done(err);
                done(err);
            });
    });
});