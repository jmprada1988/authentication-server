const expect = require('chai').expect;
const sinnon = require('sinon');
const mongoose = require('mongoose');

const User = require('../models/user');
const AuthController = require('../controllers/auth');
// For test to work correctly, assign the value of the ENV Variable to MONGO_URI 
const MONGO_URI = 'change this value fo the real key';
describe('Auth controller', function(){
  before(function(done){
    mongoose.connect(
      MONGO_URI
    )
    .then(result => {
      const user = new User({
        email: 'test@test.com',
        password: 'tester',
        name: 'Tester',
        posts:[],
        _id: '5e141a8dabf57b027d52168a'
      });
      return user.save()
    })
    .then(() => {
      done();
    })
  })
  it('Should throw an error with code 500 if access to the db fails', function(done){
    sinnon.stub(User, 'findOne');
    User.findOne.throws();
    const req = {
      body: {
        email: 'test@test.com',
        password: 'tester1234'
      }
    }
    AuthController.login(req, {}, ()=>{}).then(result => {
      expect(result).to.be.an('error');
      expect(result).to.have.property('statusCode', 500);
      // fuction to make async test calls
      done();
    })

    User.findOne.restore();
  })
  it('Should send a response with a valid user status for existing user', function(done){
      const req = {
        userId: '5e141a8dabf57b027d52168a'
      }
      const res = {
        statusCode: 500,
        userStatus: null,
        status: function(code) {
          this.statusCode = code;
          return this;
        },
        json: function(data) {
          this.userStatus = data.status;
        }
      }
      AuthController.getUserStatus(req, res, () => {}).then(() => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.userStatus).to.be.equal('New User');
          done()
      })
    })
  after(function(done) {
    User.deleteMany({})
    .then(() => {
      return mongoose.disconnect();
    })
    .then(() => {
      done();
    })
  })
})