const express = require('express');

const User = require('../Model/User.model');
const createHttpError = require('http-errors');
const { valschema } = require('../Utils/validation');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../Utils/jwt_utils');

const client = require('../Utils/init_redis');

module.exports = {
	register: async (req, res, next) => {
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
			const refreshToken = await signRefreshToken(saveUser.id);

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
	},
	refresh: async (req, res, next) => {
		try {
			const { refresh_token } = req.body;
			if (!refresh_token) throw createHttpError.BadRequest();

			const userId = await verifyRefreshToken(refresh_token);

			const access_token = await signAccessToken(userId);
			const newrefreshToken = await signRefreshToken(userId);

			res.send({ access_token, refresh_token: newrefreshToken });
		} catch (error) {
			console.log(error);
			next(error);
		}
	},

	login: async (req, res, next) => {
		const { username, password } = req.body;

		const validateReq = await valschema.validateAsync({ username, password });

		const userexist = await User.findOne({ username: validateReq.username });

		if (!userexist) throw createHttpError.NotFound(`${validateReq.username} is not Registered`);

		const isMatch = await userexist.isValidPassword(validateReq.password);
		if (!isMatch) throw createHttpError.Unauthorized('Username/Pass is not valid');

		const access_token = await signAccessToken(userexist.id);
		const refresh_token = await signRefreshToken(userexist.id);

		res.send({
			username: validateReq.username,
			access_token,
			refresh_token
		});
	},
	logout: async (req, res, next) => {
		try {
			const { refresh_token } = req.body;
			if (!refresh_token) throw createError.BadRequest();
			const userId = await verifyRefreshToken(refresh_token);

			client.DEL(userId, (err, val) => {
        if (err) {
          console.log(err.message)
          throw createError.InternalServerError()
        }
        console.log(val)
        res.sendStatus(204)
      })
		} catch (error) {
			next(error);
		}
	}
};
