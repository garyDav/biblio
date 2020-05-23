import Debug from 'debug'
import app from './app'
import mongoose from 'mongoose'
import { config } from './config'
import { createServer } from 'http'

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_NAME = config.dbName;

//const MONGO_URI = `mongodb://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}/test?retryWrites=true&w=majority`
const MONGO_URI = `mongodb://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}`

const debug = Debug('biblio-backend:root'),
      server = createServer(app)

async function start() {
  await mongoose.connect(MONGO_URI)

  // Server
  server.listen(config.port, _ => {
    debug(`Listening http://localhost:${server.address().port}`)
  })
}

start()
