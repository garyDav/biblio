import express from 'express'
import bodyParser from 'body-parser'

const {
  logErrors,
  wrapErrors,
  clientErrorHandler,
  errorHandler
} = require('./utils/middlewares/errorsHandlers')

const isRequestAjaxOrAPI = require('./utils/isRequestAjaxOrAPI')

// App
const app = express()

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Static files
app.use('/static', express.static(path.join(__dirname, 'public')))

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS')
  next()
})

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
