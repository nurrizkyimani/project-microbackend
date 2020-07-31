const express = require('express')
const router = express.Router()


router.post('/register', async (req, res, next) => {
  res.send('register rout')
})


router.post('/refresh-token', async (req, res, next) => {
  res.send('refresh token route')
})

router.post('/login', async (req, res, next) => {
  res.send('login route')
})

router.delete('/logout', async (req, res, next) => {
  res.send('res send ')
})




module.exports = router