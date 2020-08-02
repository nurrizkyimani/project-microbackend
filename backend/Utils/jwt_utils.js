const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const client = require('../Utils/init_redis');
const { create } = require('../Model/User.model');

module.exports = {

	signAccessToken: (userId) => {
		return new Promise(function(resolve, reject) {
			const payload = {};
			const secret = process.env.ACCESS_TOKEN_SECRET;
			const option = {
				expiresIn: '1h',
				issuer: 'indieuni',
				audience: userId
			};

			JWT.sign(payload, secret, option, function(err, token) {
				if (err) {
					console.log(err);
					reject(createError.InternalServerError());
				}
				resolve(token);
			});
		});
  },
  
	verifiedAccessToken: (req, res, next) => {
		if (!req.headers['authorization']) return next(createError.Unauthorized());
		const authHeader = req.headers['authorization'];
		const bearerToken = authHeader.split(' ');
		const token = bearerToken[1];

		JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, payload) {
			if (err) {
				const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
				return next(createError.Unauthorized(message));
			}
			console.log('Verified');
			req.payload = payload;
			next();
		});
  },
  
	signRefreshToken: (userId) => {
		return new Promise((resolve, reject) => {
			const payload = {};
			const secret = process.env.REFERSH_TOKEN_SECRET;
			const option = {
				expiresIn: '1y',
				issuer: 'nurrizky',
				audience: userId
			};

			JWT.sign(payload, secret, option, (err, token) => {
				if (err) {
					console.log(err.message);
					reject(createError.InternalServerError());
				}

				client.SET(userId, token, 'EX', 365 * 24 * 60 * 60, (err, reply) => {
					if (err) {
						console.log(err.message);
						reject(createError.InternalServerError());
						return;
					}

					resolve(token);
				});
			});
		});
  },
  
	verifyRefreshToken: (refreshToken) => {
		return new Promise((resolve, reject) => {
			JWT.verify(refreshToken, process.env.REFERSH_TOKEN_SECRET, function(err, payload) {
				if (err) return reject(createError.Unauthorized());
				const userId = payload.aud;

				client.GET(userId, (err, result) => {
					if (err) {
						console.log(err);
						reject(createError.InternalServerError());
						return;
					}

					if (result == refreshToken) return resolve(userId);
					reject(createError.Unauthorized());
				});

				resolve(userId);
			});
		});
	}
};
