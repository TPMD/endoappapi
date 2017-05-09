import server from './server'
import { initializeDatabase } from './config'
import mongoose from 'mongoose'


initializeDatabase()
  .then(() => {
    server.listen(process.env.PORT || 3000)
  })




