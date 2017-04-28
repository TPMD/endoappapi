import bcrypt from 'bcrypt'
import { Router } from 'express'
import mongoose from 'mongoose'
import jwt from 'json-web-token'


const router = Router()

router.route('/')
  .get((req, res) => {
    let token = req.query.token
    if(token) {
      mongoose
      .model('user')
      .findOne({token})
      .then(user => {
        if(!user) {
          return res.status(404).send({
            message: 'Token Expired. Login again.'
          })
        }
        return res.status(200).json(user)
      })
      .catch(err => res.send(err))
    }
    else {
      res.send({code:500})
    }
  })
  .post((req, res) => {
    mongoose
    .model('user')
    .create(req.body)
    .then(user => res.json(user))
  })

router.route('/login')
  .post((req, res) => {
    mongoose
    .model('user')
    .findOne({email:req.body.email})
    .then(user => {
      if(!user) {
        return res.status(500).send('user does not exist')
      }
      if(bcrypt.compareSync(req.body.password, user.password)) {
        const payload = user
        const secret = req.body.password
        jwt.encode(secret, payload, ((err, token) => {
          if(!!err) {
            return res.status(err.status_code).send(err.message)
          }
          else {
            user.token = token
            user.save((err, updatedUser) => {
              if(!!err) {
                return res.status(err).send("could not update users token")
              }
              return res.status(200).send(updatedUser)
            })
          }
        }))
      }
      else {
        return res.status(403).send('Incorrect password')
      }
    })
  })
router.route('/signup')
  .post((req, res) => {
    console.log('got signup request')
    let query = {email: req.body.email}
    let update = Object.assign({}, req.body, {password: bcrypt.hashSync(req.body.password, 10)})
    let options = {upsert:true, new:true, setDefaultOnInsert:true}
    mongoose
    .model('user')
    .findOneAndUpdate(query, update, options)
    .then(user => {
      const payload = user
      const secret = req.body.password
      jwt.encode(secret, payload, ((err, token) => {
          if(!!err) {
            return res.status(err.status_code).send(err.message)
          }
          return res.status(200).json({token, user})
        }))
    })
    .catch(err => res.status(500).send('could not create user'))
  })


export default router