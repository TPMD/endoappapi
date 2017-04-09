import bcrypt from 'bcrypt'
import { expect } from 'chai'
require('../config')
require('../models')
import mongoose from 'mongoose'
import server from '../server'
import request from 'supertest'

let agent

let doctors = []

describe('Model tests', () => {

  before(done => {
    agent = request.agent(server)
    mongoose
      .connect(process.env.TEST_DATABASE_URL)
      .then(done)
      .catch(done)
  })

  after(done => {
    mongoose.model('doctor').find({}).remove()
      .then(() => mongoose.model('patient').find({}).remove())
      .then(() => mongoose.model('user').find({}).remove())
      .then(() => mongoose.disconnect(done))
      .catch(done)
  })

  it('should get all doctors', done => {
    mongoose
    .model('doctor')
    .find({})
    .then(res => {
      expect(res).to.be.an('array')
      done()
    })
  })
  it('should create a doctor', done => {
    let doctor = {
      name: 'testing',
      hospital:'testing',
      description: 'yoooo',
      hospital: 'testing',
      createdAt: Date.now(),

    }
    mongoose
    .model('doctor')
    .create(doctor)
    .then(res => {
      expect(res).to.be.an('object')
      done()
    })

  })
  it('should find doctors after one has been created', done => {
    mongoose
    .model('doctor')
    .find({})
    .then(res => {
      expect(res).to.be.an('array')
      done()
    })
  })
  it('should get all patients', done => {
    mongoose
    .model('patient')
    .find({})
    .then(res => {
      expect(res).to.be.an('array')
      done()
    })
  })
  it('should create a patient', done => {
    let patient = {
      name: 'patient 1',
      doctorId: '1',
      createdAt: Date.now(),
      insurance: 'test insurance'
    }
    mongoose
    .model('patient')
    .create(patient)
    .then(res => {
      expect(res).to.be.an('object')
      done()
    })

  })
  it('should find patients after one has been created', done => {
    mongoose
    .model('patient')
    .find({})
    .then(res => {
      expect(res).to.be.an('array')
      done()
    })
  })
  it('should create a user', done => {
    let user = {
      email: 'jonathankolman@gmail.com',
      userType: 'doctor',
      createdAt: Date.now(),
      password: bcrypt.hashSync('testing123', 10)
    }
    mongoose
    .model('user')
    .create(user)
    .then(res => {
      console.log(res)
      expect(res).to.be.an('object')
      done()
    })
    .catch(done)

  })
  it('should find users after one has been created', done => {
    mongoose
    .model('user')
    .find({})
    .then(res => {
      expect(res).to.be.an('array')
      done()
    })
  })

 
})
