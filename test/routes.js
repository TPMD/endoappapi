import { expect } from 'chai'
import server from '../server'
import request from 'supertest'
import mongoose from 'mongoose'
import agent from 'superagent-bluebird-promise'

describe('routes', () => {
  before(done => {
    mongoose
      .connect(process.env.DATABASE_URL)
      .then(() => {
        server.listen('5000', () => console.log('test server listening on port 5000'))
        done()
      })
      .catch(done)
  })
  it('should signup a new user', done => {
    let user  = {
      email:'testing@gmail.com',
      password: 'testing123',
      userType:'doctor',
      createdAt: Date.now()
    }
    agent
    .post(process.env.API_URL+'/user/signup')
    .send(user)
    .then(res => {
      expect(res).to.be.ok
      done()
    })
    .catch(done)
  })
  it('should login a user', done => {
    let user = {
      email: 'jack@gmail.com',
      password: 'testing123'
    }
    agent
    .post(process.env.API_URL+'/user/login')
    .send(user)
    .then(res => {
      expect(res).to.be.ok
      expect(res.body).to.be.an('object')
      expect(res.body.token).to.not.be.undefined
      done()
    })
    .catch(done)
  })
  it('should create a new patient', done => {
    let patient = {
      doctor: 'mr shapira',
      name: 'Jeremy Gibbens',
      createdAt: Date.now(),
      insurance: 'insurance 1'
    }
    agent
    .post(process.env.API_URL+'/patient')
    .send(patient)
    .then(res => {
      console.log(res.body)
      expect(res).to.be.ok
      expect(res.body).to.be.an('object')
      done()
    })
  })
})