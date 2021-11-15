import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../../api';

const CreateNote = () => {
	let navigate = useNavigate();
	const [note, setNote] = useState({
		title: '',
		content: '',
		date: '',
	});

	const onChangeInput = (e) => {
		const { name, value } = e.target;
		setNote({ ...note, [name]: value });
	};

	const createNote = async (e) => {
		e.preventDefault();
		try {
			const token = localStorage.getItem('tokenStore');
			if (token) {
				const { title, content, date } = note;
				const newNote = { title, content, date };
				await axios({
					method: 'POST',
					withCredentials: true,
					url: `${baseURL}/notes`,
					data: newNote,
					headers: {
						Authorization: token
					}
				});
				return navigate('/');
			}
		} catch (error) {
			window.location.href = '/';
		}
	};

	return (
		<div className='create-note'>
			<h2>Create Note</h2>
			<form onSubmit={createNote} autoComplete='off'>
				<div className='row'>
					<label htmlFor='title'>Title</label>
					<input
						type='text'
						name='title'
						required
						value={note.title}
						onChange={onChangeInput}
					/>
				</div>
				<div className='row'>
					<label htmlFor='content'>Content</label>
					<textarea
						type='text'
						name='content'
						required
						value={note.content}
						rows='10'
						onChange={onChangeInput}
					/>
				</div>
				<div className='row'>
					<label htmlFor='date'>Date: {note.date}</label>
					<input
						type='date'
						name='date'
						required
						rows='10'
						onChange={onChangeInput}
					/>
				</div>
				<button>Create Note</button>
			</form>
		</div>
	);
};

export default CreateNote;
