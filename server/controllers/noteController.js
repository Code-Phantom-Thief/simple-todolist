const Note = require('../models/Note');

exports.getAllNotes = async (req, res) => {
	try {
		const notes = await Note.find({ user_id: req.user.id });
		return res.status(201).json({
			success: true,
			notes,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: error.message });
	}
};

exports.createNote = async (req, res) => {
	const { title, content, date } = req.body;

	if (!title) {
		return res
			.status(400)
			.json({ success: false, message: 'Title required' });
	}

	if (!content) {
		return res.status(400).json({
			success: false,
			message: 'Content required',
		});
	}

	try {
		const NewNote = new Note({
			title,
			content,
			date,
			user_id: req.user.id,
			name: req.user.name,
		});

		await NewNote.save();

		return res.status(201).json({
			success: true,
			message: 'Note created successfully!!!',
		});
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: error.message });
	}
};

exports.deleteNote = async (req, res) => {
	try {
		await Note.findByIdAndDelete(req.params.id);
		return res.status(200).json({
			success: true,
			message: 'Note deleted successfully!!!',
		});
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: error.message });
	}
};

exports.updateNote = async (req, res) => {
	const { title, content, date } = req.body;
	try {
		await Note.findOneAndUpdate(
			{ _id: req.params.id },
			{
				title,
				content,
				date,
			}
		);
		return res.status(200).json({
			success: true,
			message: 'Note updated successfully!!!',
		});
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: error.message });
	}
};

exports.getNote = async (req, res) => {
	try {
		const note = await Note.findById(req.params.id);
		if (!note) {
			return res.status(400).json({
				success: false,
				message: 'Note not found',
			});
		}
		return res.status(200).json({
			success: true,
			note,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: 'Note not found' });
	}
};
