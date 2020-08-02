const express = require('express');
const router = express.Router();
const User = require('../Model/User.model');
const createHttpError = require('http-errors');
const { valschema } = require('../Utils/validation');

router.post('/register', async (req, res, next) => {
	try {
		const { username, password } = req.body;

		const result = await valschema.validateAsync({ username, password });

		console.log(username);
		if (!username || !password) throw createHttpError.BadRequest();

		const doesExist = await User.findOne({ username: result.username });
		if (doesExist) throw createHttpError.Conflict(`${result.email} is already been registered`);

		const user = new User(result);
		const userdone = await user.save();

		res.send({
			success: true,
			message: userdone
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
	res.send('login route');
});

router.delete('/logout', async (req, res, next) => {
	res.send('res send ');
});

module.exports = router;
