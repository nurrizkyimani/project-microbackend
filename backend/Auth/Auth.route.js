const express = require('express');
const router = express.Router();
const User = require('../Model/User.model');
const createHttpError = require('http-errors');


const client = require('../Utils/init_redis')
const {register , refresh, logout, login, get_bio} = require('../Controller/Auth.Control')

router.post('/register',register );

router.post('/refresh-token', refresh );

router.post('/login', login );

router.delete('/logout', logout);

// router.get('/bio', get_bio )

module.exports = router;
