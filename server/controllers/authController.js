const User = require('../models/User');
const { sign, verify } = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

exports.registerUser = async (req, res) => {
	const { username, email, password } = req.body;
	try {
		if (!username) {
			return res.status(400).json({
				success: false,
				message: 'Username does not allow empty',
			});
		}

		if (!email) {
			return res.status(400).json({
				success: false,
				message: 'Email does not allow empty',
			});
		}

		if (!password) {
			return res.status(400).json({
				success: false,
				message: 'Password does not allow empty',
			});
		}

		const existUser = await User.findOne({ email });

		if (existUser) {
			return res.status(400).json({
				success: false,
				message:
					'You were already this site member. Please log in',
			});
		}

		const newUser = new User({ username, email, password });
		await newUser.save();

		res.status(201).json({
			success: true,
			message: 'User registered successfully!!!',
		});
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: error.message });
	}
};

exports.loginUser = async (req, res) => {
	const { email, password } = req.body;
	if (!email) {
		return res.status(400).json({
			success: false,
			message: 'Email does not allow empty',
		});
	}

	if (!password) {
		return res.status(400).json({
			success: false,
			message: 'Password does not allow empty',
		});
	}
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({
				success: false,
				message:
					'Email address or Password does not match.',
			});
		}
		const validPassword = await user.comparePassword(
			password
		);
		if (!validPassword) {
			return res.status(400).json({
				success: false,
				message:
					'Email address or Password does not match.',
			});
		}

		// If login success, token creates
		const payload = { id: user._id, name: user.username };
		const token = await sign(payload, JWT_SECRET, {
			expiresIn: '6h',
		});

		res.status(201).json({
			success: true,
			message: 'Login successfully!!!',
			token,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: error.message });
	}
};

exports.verifiedToken = async (req, res) => {
	try {
		const token = req.header('Authorization');
		if (!token) {
			return res.send(false);
		}
		verify(token, JWT_SECRET, async (err, verified) => {
			if (err) return res.send(false);
			const user = await User.findById(verified.id);
			if (!user) {
				return res.send(false);
			}
			return res.send(true);
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
