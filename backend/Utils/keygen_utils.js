const crypto = require('crypto')

const access_secret = crypto.randomBytes(32).toString('hex')
const refresh_secret  = crypto.randomBytes(32).toString('hex')
console.table({access_secret, refresh_secret});