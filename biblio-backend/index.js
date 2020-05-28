import Debug from 'debug'
import app from './app'
import mongoose from 'mongoose'
import { config } from './config'
import { createServer } from 'http'

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}`

const debug = Debug('biblio-backend:root'),
      server = createServer(app)

async function start() {
  //debug(MONGO_URI)
  await mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})

  // Server
  server.listen(config.port, _ => {
    debug(`Listening http://localhost:${server.address().port}`)
  })
}

start()
