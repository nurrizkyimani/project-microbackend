const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
require('dotenv').config()
const AuthRoute = require('./Auth/Auth.route')

const connectMongo = require('./Utils/init_mongodb')
const { verifiedAccessToken } = require('./Utils/jwt_utils')

require('./Utils/init_redis')

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectMongo()

app.get('/',verifiedAccessToken, async (req, res, next) => {
  res.send('Hello from express.')
})

app.use('/auth', AuthRoute)



app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  })
})


app.use(async (err, res, req, next) => {
  next(createError.NotFound())
})





const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`App listen to ${PORT}`);
})