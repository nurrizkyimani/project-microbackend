const express = require('express');
const router = express.Router();
const User = require('../Model/User.model');
const { verifiedAccessToken } = require('../Utils/jwt_utils');
const createHttpError = require('http-errors');


// const client = require('../Utils/init_redis')
// const {register , refresh, logout, login, get_bio} = require('../Controller/Auth.Control')

router.get('/profil', (req, res) => {
  try {
    const ac_token = req.cookies.a_token
    if (!ac_token) throw createHttpError.BadRequest();
    // const userId = await verifiedAccessToken(ac_token);

    res.send({
    success: true,
    istoken: token,
  })
  } catch (error) {
    console.log(error);
    next(error);
  }

  
} );


module.exports = router;



