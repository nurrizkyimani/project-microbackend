const express = require('express');
const router = express.Router();
const User = require('../Model/User.model');
const createHttpError = require('http-errors');
const { valschema } = require('../Utils/validation');
const { signAccessToken, signRefreshToken } = require('../Utils/jwt_utils');

router.post('/register', async (req, res, next) => {
	try {
		const { username, password } = req.body;

		const result = await valschema.validateAsync({ username, password });

		console.log(username);
		if (!username || !password) throw createHttpError.BadRequest();

		const doesExist = await User.findOne({ username: result.username });
		if (doesExist) throw createHttpError.Conflict(`${result.email} is already been registered`);

		const user = new User(result);
		const savedUser = await user.save();

    const accessToken = await signAccessToken(savedUser.id);
    const refreshToken = await signRefreshToken(saveUser.id)

		res.send({
			success: true,
			message: savedUser,
      accesToken: accessToken,
      refreshToken
		});
	} catch (error) {
		if (error.isJoi === true) error.status = 422;
		console.log(`this is error : ${error}`);
		next(error);
	}
});

router.post('/refresh-token', async (req, res, next) => {
	res.send('refresh token route');
});

router.post('/login', async (req, res, next) => {
	const { username, password } = req.body;

	const validateReq = await valschema.validateAsync({ username, password });

  const userexist = await User.findOne({ username: validateReq.username });
  
	if (!userexist) throw createHttpError.NotFound(`${validateReq.username} is not Registered`);

  const isMatch = await userexist.isValidPassword(validateReq.password);
  if (!isMatch) throw createHttpError.Unauthorized('Username/Pass is not valid');

  const access_token = await signAccessToken(userexist.id)
  const refresh_token = await signRefreshToken(userexist.id)

  res.send({
    username: validateReq.username,
    access_token,
    refresh_token
  })
});

router.delete('/logout', async (req, res, next) => {
	res.send('res send ');
});

module.exports = router;
