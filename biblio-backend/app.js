import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import boom from 'boom'
import { libro, prestamo } from './routes'
import isRequestAjaxOrAPI from './utils/isRequestAjaxOrAPI'

import {
  logErrors,
  wrapErrors,
  clientErrorHandler,
  errorHandler
} from './utils/middlewares/errorsHandlers'

// App
const app = express()

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Security
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, GET, PATCH, DELETE, OPTIONS')
  next()
})

// Static files
app.use('/static', express.static(path.join(__dirname, 'public')))

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Routes
app.use('/api/libros', libro)
app.use('/api/prestamos', prestamo)

app.use((req, res, next) => {
  if(isRequestAjaxOrAPI(req)) {
    const {
      output: { statusCode, payload }
    } = boom.notFound()

    res.status(statusCode).json(payload)
  }
  res.status(404).render('404')
})

// Error handlers 
app.use(logErrors)
app.use(wrapErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

export default app
