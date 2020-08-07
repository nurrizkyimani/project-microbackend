const redis = require('redis')


const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  // password: process.env.REDIS_PASSWORD
})
client.AUTH(process.env.REDIS_PASSWORD)

client.on('connect', function () {
  console.log(`Client connect to redis on ${process.env.REDIS_HOST} `);
})


client.on('ready', function () {
  console.log(`Client connect to redis and READY on ${process.env.REDIS_HOST} `);
})

client.on('error', function (err) {
  console.log(`This is error : ${err.message}`);
})

client.on('end', function () {
  console.log(`Client disconnected from redis ${process.env.REDIS_HOST}`);
})

process.on('SIGINT', function () {
  client.quit()
})

module.exports = client 