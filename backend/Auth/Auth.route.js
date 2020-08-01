const express = require('express')
const router = express.Router()
const User = require('../Model/User.model')
const createHttpError = require('http-errors')


router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body

    console.log(username);
    if(!username || !password) throw createHttpError.BadRequest()

    const doesExist = await User.findOne({ username: username })
      if (doesExist)
        throw createError.Conflict(`${username} is already been registered`)

    
    
    const user = new User({ username, password })
    const userdone = await user.save()
    console.log(user);

    res.send(userdone)

  } catch (error) {
    console.log(`this is error : ${error}`);
    next(error)
  }

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