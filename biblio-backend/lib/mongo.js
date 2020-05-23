import Debug from 'debug'
import { MongoClient, ObjectId } from 'mongodb'
import { config } from '../config'

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_NAME = config.dbName;
const debug = Debug('biblio-backend:lib')

const MONGO_URI = `mongodb://${USER}:${PASSWORD}@${config.dbHost}/test?retryWrites=true&w=majority`

class MongoLib {
  constructor() {
    debug(`MONGO URI: ${MONGO_URI}`)
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    this.dbName = DB_NAME
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.client.connect(error => {
        if(error) {
          reject(error)
        }
        console.log('Connected succesfully to mongo')
        resolve(this.client.db(this.dbName))
      })
    })
  }

  getAll(collection, query) {
    return this.connect().then(db => {
      return db
        .collection(collection)
        .find(query)
        .toArray()
    })
  }

  get(collection, id) {
    return this.connect().then(db => {
      return db.collection(collection).findOne({ _id: ObjectId(id) })
    })
  }

  create(collection, data) {
    return this.connect()
      .then(db => {
        return db.collection(collection).insertOne(data)
      })
      .then(result => result.insertedId)
  }

  update(collection, id, data) {
    return this.connect()
      .then(db => {
        return db
          .collection(collection)
          .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true })
      })
      .then(result => result.upsertedId || id)
  }

  delete(collection, id) {
    return this.connect()
      .then(db => {
        return db
          .collection(collection)
          .deleteOne({ _id: ObjectId(id) })
      })
      .then(_ => id)
  }
}

export default MongoLib
//module.exports = MongoLib