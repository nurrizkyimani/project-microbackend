const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
require('dotenv').config()

const AuthRoute = require('./Auth/Auth.route')

const connectMongo = require('./Utils/init_mongodb')

const app = express()
app.use(morgan('dev'))

connectMongo()

app.get('/', async (res, req, next) => {
    res.send(`Home`)
})

app.use(async ( res, req, next) => {
  const error = new Error(`Error, not Found`)
  error.status = 404
  next(error)
})


app.use(async (err, res, req, next) => {
  next(createError.NotFound())
})

app.use('/', AuthRoute)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`App listen to ${PORT}`);
})