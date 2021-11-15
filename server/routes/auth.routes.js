const router = require('express').Router();
const {
	registerUser,
	loginUser,
	verifiedToken,
} = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify', verifiedToken);

module.exports = router;