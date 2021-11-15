const router = require('express').Router();
const {
	getAllNotes,
	createNote,
	deleteNote,
	updateNote,
    getNote,
} = require('../controllers/noteController');

const auth = require('../middlewares/auth');

router
	.route('/')
	.get(auth, getAllNotes)
	.post(auth, createNote);
router
	.route('/:id')
	.get(auth, getNote)
	.put(auth, updateNote)
	.delete(auth, deleteNote);

module.exports = router;
