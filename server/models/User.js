const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { compare, hash } = require('bcrypt');

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			trim: true,
			maxlength: 50,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			maxlength: 200,
		},
		password: {
			type: String,
			required: true,
			trim: true,
			minlength: 6,
		},
	},
	{ timestamps: true }
);

UserSchema.pre('save', async function (next) {
	try {
		if (!this.isModified === 'password') {
			next();
		}
		this.password = await hash(this.password, 12);
	} catch (error) {
		console.log(error.message);
		return;
	}
});

UserSchema.methods.comparePassword = async function (
	enteredPassword
) {
	try {
		return await compare(enteredPassword, this.password);
	} catch (error) {
		console.log(error.message);
		return;
	}
};


module.exports = mongoose.model('User', UserSchema);
