const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			maxlength: 50,
		},
		content: {
			type: String,
			required: true,
			maxlength: 3000,
		},
		date: {
			type: Date,
			default: Date.now,
		},
		user_id: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Note', NoteSchema);
