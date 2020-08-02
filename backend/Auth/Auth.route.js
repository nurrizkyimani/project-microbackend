const express = require('express');
const router = express.Router();
const User = require('../Model/User.model');
const createHttpError = require('http-errors');
const { valschema } = require('../Utils/validation');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../Utils/jwt_utils');

const client = require('../Utils/init_redis')
const {register , refresh, logout, login} = require('../Controller/Auth.Control')

router.post('/register',register );

router.post('/refresh-token', refresh );

router.post('/login', login );

router.delete('/logout', logout);

module.exports = router;
